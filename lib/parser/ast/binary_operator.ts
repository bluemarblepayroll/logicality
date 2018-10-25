/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from "../../lexer/token";
import { Node } from "./node";

export class BinaryOperator extends Node {
  public readonly left: Node;
  public readonly right: Node;
  public readonly name: string;

  constructor(left: Node, token: Token, right: Node) {
    super(token);

    this.name = "BinaryOperator";
    this.left = left;
    this.right = right;
  }
}
