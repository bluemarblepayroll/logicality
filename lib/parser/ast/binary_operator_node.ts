/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from "../../lexer/token";
import { AstNode } from "./ast_node";

export class BinaryOperatorNode extends AstNode {
  public readonly left: AstNode;
  public readonly right: AstNode;
  public readonly name: string;

  constructor(left: AstNode, token: Token, right: AstNode) {
    super(token);

    this.name = "BinaryOperatorNode";
    this.left = left;
    this.right = right;
  }
}
