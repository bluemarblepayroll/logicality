/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AstNode } from "../parser/ast";
import { Logger } from "../util/logger";

export class NodeVisitor {

  public visit(node: AstNode): boolean {
    if (!node) {
      return null;
    }

    const visitorName: string = this.getMethodName(node);

    Logger.log(`Visiting: ${node} with method: ${visitorName}`);

    if (this[visitorName]) {
      return this[visitorName](node);
    } else {
      return this.genericVisit(node);
    }
  }

  private genericVisit(node: AstNode): boolean {
    throw new Error(`No visitor method: ${this.getMethodName(node)}`);
  }

  private getMethodName(node: AstNode): string {
    return `visit${node.name}`;
  }
}
