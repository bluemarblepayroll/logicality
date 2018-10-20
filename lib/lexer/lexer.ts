/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Logger } from "../util/logger";
import { IGrammar, simpleGrammar } from "./grammar";
import { Token, TokenType } from "./token";

export interface ILexer {
  getNextToken(): Token;
  reset(): void;
}

export class SimpleLexer implements ILexer {
  private readonly expression: string;
  private readonly grammar: IGrammar;
  private matches: Token[];
  private currentIndex: number;

  constructor(expression: string) {
    if (!expression) {
      throw new Error("Expression is required");
    }

    this.grammar = simpleGrammar;
    this.expression = expression;

    const invalid: string = this.invalidMatches();

    if (invalid) {
      throw new Error(`Invalid lexer syntax: ${invalid}`);
    }

    this.matches = this.getMatches();
    this.currentIndex = -1;

    Logger.log(`[SimpleLexer::constructor] ${this.expression} -> ${this.matches.join(", ")}`);
  }

  public getNextToken(): Token {
    this.currentIndex++;

    if (this.currentIndex > this.matches.length - 1) {
      return null;
    }

    const token = this.matches[this.currentIndex];

    Logger.log(`getNextToken: ${token}`);

    return token;
  }

  public reset(): void {
    this.currentIndex = -1;
  }

  private invalidMatches(): string {
    return this.expression.replace(this.invalidPattern(), "");
  }

  private getMatches(): Token[] {
    const matched: string[] = this.expression.match(this.pattern()) || [];

    return matched.map((m) => this.tokenize(m));
  }

  private tokenize(str: string): Token {
    for (const key of Object.keys(this.grammar)) {
      const regex: RegExp = this.grammar[key];
      const type: string = key.charAt(0).toUpperCase() + key.slice(1);

      if (regex.test(str)) {
        return new Token(TokenType[type], str);
      }
    }

    return null;
  }

  private pattern(): RegExp {
    const pattern: string = Object.keys(this.grammar)
      .map((key) => `(${this.grammar[key].source})`)
      .join("|");

    return new RegExp(pattern, "g");
  }

  private invalidPattern(): RegExp {
    const pattern: RegExp = this.pattern();
    const invalidPattern: string = `${pattern.source}|(\\s*)`;

    return new RegExp(invalidPattern, "g");
  }
}
