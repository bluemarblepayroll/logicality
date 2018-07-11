/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
export interface Grammar {
  value: RegExp;
  andOp: RegExp;
  orOp: RegExp;
  notOp: RegExp;
  leftParen: RegExp;
  rightParen: RegExp;
}

export const simpleGrammar:Grammar = {
  value: /[a-zA-Z0-9_$@\.]+/, //Operand
  andOp: /&&/, //Operator
  orOp: /\|\|/, //Operator
  notOp: /\!/, //Operator
  leftParen: /\(/,
  rightParen: /\)/
}
