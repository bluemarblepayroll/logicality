/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ILexer } from "../lexer/lexer";
import { Token, TokenType } from "../lexer/token";
import { BinaryOperator } from "./ast/binary_operator";
import { Node } from "./ast/node";
import { UnaryOperator } from "./ast/unary_operator";
import { ValueOperand } from "./ast/value_operand";

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

  public parse(): Node {
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

  private factor(): Node {
    // factor : VALUE | LEFT_PAREN expr RIGHT_PAREN | NOT_OP expr

    const token: Token = this.currentToken;

    if (token.type === TokenType.Value) {
      this.eat(TokenType.Value);
      return new ValueOperand(token);
    } else if (token.type === TokenType.LeftParen) {
      this.eat(TokenType.LeftParen);
      const node: Node = this.expr();
      this.eat(TokenType.RightParen);
      return node;
    } else if (token.type === TokenType.NotOp) {
      this.eat(TokenType.NotOp);
      const node: Node = this.factor();
      return new UnaryOperator(node, token);
    } else {
      throw new Error(`Factor cannot determine what to do with: ${token}`);
    }
  }

  private expr(): Node {
    // expr   : factor ((&& | ||) factor)*
    // factor : VALUE | LEFT_PAREN expr RIGHT_PAREN | NOT_OP expr

    let node: Node = this.factor();

    while (this.currentToken &&
      (this.currentToken.type === TokenType.AndOp ||
       this.currentToken.type === TokenType.OrOp)) {
      const token: Token = this.currentToken;

      if (token.type === TokenType.AndOp) {
        this.eat(TokenType.AndOp);
      } else if (token.type === TokenType.OrOp) {
        this.eat(TokenType.OrOp);
      }

      node = new BinaryOperator(node, token, this.factor());
    }

    return node;
  }
}
