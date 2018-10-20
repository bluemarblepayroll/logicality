/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface IGrammar {
  andOp: RegExp;
  leftParen: RegExp;
  notOp: RegExp;
  orOp: RegExp;
  rightParen: RegExp;
  value: RegExp;
}

export const simpleGrammar: IGrammar = {
  andOp: /&&/, // Operator
  leftParen: /\(/,
  notOp: /\!/, // Operator
  orOp: /\|\|/, // Operator
  rightParen: /\)/,
  value: /[a-zA-Z0-9_$@?\.]+/, // Operand
};
