/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Node } from "../parser/ast/node";
import { log } from "../util/logger";

export class NodeVisitor {

  public visit(node: Node): boolean {
    if (!node) {
      return null;
    }

    const visitorName: string = this.getMethodName(node);

    log(`Visiting: ${node} with method: ${visitorName}`);

    if (this[visitorName]) {
      return this[visitorName](node);
    } else {
      return this.genericVisit(node);
    }
  }

  private genericVisit(node: Node): boolean {
    throw new Error(`No visitor method: ${this.getMethodName(node)}`);
  }

  private getMethodName(node: Node): string {
    return `visit${node.name}`;
  }
}
