/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ILexer } from "../lexer/lexer";
import { Token, TokenType } from "../lexer/token";
import { AstNode } from "./ast/ast_node";
import { BinaryOperatorNode } from "./ast/binary_operator_node";
import { UnaryOperatorNode } from "./ast/unary_operator_node";
import { ValueOperandNode } from "./ast/value_operand_node";

export class Parser {
  private readonly lexer: ILexer;
  private currentToken: Token;

  constructor(lexer: ILexer) {
    if (!lexer) {
      throw new Error("Lexer is required");
    }

    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();

    if (!this.currentToken) {
      throw new Error("Lexer must contain at least one token");
    }
  }

  public parse(): AstNode {
    return this.expr();
  }

  private error(): void {
    throw new Error("Invalid parser syntax");
  }

  private eat(type: TokenType): void {
    if (this.currentToken.type === type) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      this.error();
    }
  }

  private factor(): AstNode {
    // factor : VALUE | LEFT_PAREN expr RIGHT_PAREN | NOT_OP expr

    const token: Token = this.currentToken;

    if (token.type === TokenType.Value) {
      this.eat(TokenType.Value);
      return new ValueOperandNode(token);
    } else if (token.type === TokenType.LeftParen) {
      this.eat(TokenType.LeftParen);
      const node: AstNode = this.expr();
      this.eat(TokenType.RightParen);
      return node;
    } else if (token.type === TokenType.NotOp) {
      this.eat(TokenType.NotOp);
      const node: AstNode = this.factor();
      return new UnaryOperatorNode(node, token);
    } else {
      throw new Error(`Factor cannot determine what to do with: ${token}`);
    }
  }

  private expr(): AstNode {
    // expr   : factor ((&& | ||) factor)*
    // factor : VALUE | LEFT_PAREN expr RIGHT_PAREN | NOT_OP expr

    let node: AstNode = this.factor();

    while (this.currentToken &&
      (this.currentToken.type === TokenType.AndOp ||
       this.currentToken.type === TokenType.OrOp)) {
      const token: Token = this.currentToken;

      if (token.type === TokenType.AndOp) {
        this.eat(TokenType.AndOp);
      } else if (token.type === TokenType.OrOp) {
        this.eat(TokenType.OrOp);
      }

      node = new BinaryOperatorNode(node, token, this.factor());
    }

    return node;
  }
}
