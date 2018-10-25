/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Node } from "./node";

export class UnaryOperator extends Node {
  public readonly child: Node;
  public readonly name: string;

  constructor(child, token) {
    super(token);

    this.name = "UnaryOperator";
    this.child = child;
  }
}
