/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
export enum TokenType {
  Value = 'VALUE',
  AndOp = 'AND_OP',
  OrOp = 'OR_OP',
  NotOp = 'NOT_OP',
  LeftParen = 'LEFT_PAREN',
  RightParen = 'RIGHT_PAREN',
}

export class Token {
  readonly type:TokenType;
  readonly value:string;

  constructor(type:TokenType, value:string) {
    this.type = type;
    this.value = value;
  }
}
