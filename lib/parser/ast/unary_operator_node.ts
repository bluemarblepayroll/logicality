/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AstNode } from "./ast_node";

export class UnaryOperatorNode extends AstNode {
  public readonly child: AstNode;
  public readonly name: string;

  constructor(child, token) {
    super(token);

    this.name = "UnaryOperatorNode";
    this.child = child;
  }
}
