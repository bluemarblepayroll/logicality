/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token, TokenType } from "./token";
import { Grammar, simpleGrammar } from "./grammar";
import { Logger } from '../util/logger';

export interface Lexer {
  expression:string;
  getNextToken():Token;
  reset():void;
}

export class SimpleLexer implements Lexer {
  readonly expression:string;

  private readonly grammar:Grammar;
  private matches:Array<Token>;
  private currentIndex:number;

  constructor(expression:string) {
    if (!expression) {
      throw 'Expression is required';
    }

    this.grammar = simpleGrammar;
    this.expression = expression;

    let invalid:string = this.invalidMatches();

    if (invalid) {
      throw `Invalid lexer syntax: ${invalid}`;
    }

    this.matches = this.getMatches();
    this.currentIndex = -1;

    Logger.log(`[SimpleLexer::constructor] ${this.expression} -> ${this.matches.join(', ')}`)
  }


  getNextToken():Token {
    this.currentIndex++;

    if (this.currentIndex > this.matches.length-1) {
      return null;
    }

    let token = this.matches[this.currentIndex];

    Logger.log(`getNextToken: ${token}`);

    return token;
  }

  reset():void {
    this.currentIndex = -1;
  }

  private invalidMatches():string {
    return this.expression.replace(this.invalidPattern(), '');
  }

  private getMatches():Array<Token> {
    let matched:Array<string> = this.expression.match(this.pattern()) || [];

    return matched.map(m => this.tokenize(m));
  }

  private tokenize(str:string):Token {
    for (let key of Object.keys(this.grammar)) {
      let regex:RegExp = this.grammar[key];
      let type:string = key.charAt(0).toUpperCase() + key.slice(1);

      if (regex.test(str)) {
        return new Token(TokenType[type], str);
      }
    }

    return null;
  }

  private pattern():RegExp {
    let pattern:string = Object.keys(this.grammar)
      .map(key => `(${this.grammar[key].source})`)
      .join('|');

    return new RegExp(pattern, 'g');
  }

  private invalidPattern():RegExp {
    let pattern:RegExp = this.pattern();
    let invalidPattern:string = `${pattern.source}|(\\s*)`;

    return new RegExp(invalidPattern, 'g');
  }

}
