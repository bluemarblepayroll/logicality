/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Lexer } from "../lexer/lexer";
import { Token, TokenType } from "../lexer/token";
import { AstNode, BinaryOperatorNode, UnaryOperatorNode, ValueOperandNode } from './ast';

export class Parser {
  readonly lexer:Lexer;

  private currentToken:Token;

  constructor(lexer:Lexer) {
    if (!lexer) {
      throw 'Lexer is required';
    }

    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();

    if (!this.currentToken) {
      throw 'Lexer must contain at least one token';
    }
  }

  error():void {
    throw 'Invalid parser syntax';
  }

  eat(type:TokenType):void {
    if (this.currentToken.type === type) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      this.error();
    }
  }

  factor():AstNode {
    //factor : VALUE | LEFT_PAREN expr RIGHT_PAREN | NOT_OP expr

    let token:Token = this.currentToken;

    if (token.type === TokenType.Value) {
      this.eat(TokenType.Value);
      return new ValueOperandNode(token);
    } else if (token.type === TokenType.LeftParen) {
      this.eat(TokenType.LeftParen);
      let node:AstNode = this.expr();
      this.eat(TokenType.RightParen);
      return node;
    } else if (token.type === TokenType.NotOp) {
      this.eat(TokenType.NotOp);
      let node:AstNode = this.factor();
      return new UnaryOperatorNode(node, token);
    } else {
      throw `Factor cannot determine what to do with: ${token}`;
    }
  }

  expr():AstNode {
    //expr   : factor ((&& | ||) factor)*
    //factor : VALUE | LEFT_PAREN expr RIGHT_PAREN | NOT_OP expr

    let node:AstNode = this.factor();

    while(this.currentToken &&
      (this.currentToken.type === TokenType.AndOp ||
       this.currentToken.type === TokenType.OrOp)) {
      let token:Token = this.currentToken;

      if (token.type === TokenType.AndOp) {
        this.eat(TokenType.AndOp);
      } else if (token.type === TokenType.OrOp) {
        this.eat(TokenType.OrOp);
      }

      node = new BinaryOperatorNode(node, token, this.factor());
    }

    return node;
  }

  parse():AstNode {
    return this.expr();
  }
}
