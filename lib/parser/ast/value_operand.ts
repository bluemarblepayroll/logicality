/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Node } from "./node";

export class ValueOperand extends Node {
  public readonly value: string;
  public readonly name: string;

  constructor(token) {
    super(token);

    this.name = "ValueOperand";
    this.value = token.value;
  }
}
