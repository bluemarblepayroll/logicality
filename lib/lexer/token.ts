/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum TokenType {
  AndOp = "AND_OP",
  LeftParen = "LEFT_PAREN",
  NotOp = "NOT_OP",
  OrOp = "OR_OP",
  RightParen = "RIGHT_PAREN",
  Value = "VALUE",
}

export class Token {
  public readonly type: TokenType;
  public readonly value: string;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }

  public toString(): string {
    return `${this.type}::${this.value}`;
  }
}
