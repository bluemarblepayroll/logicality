/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AstNode, BinaryOperatorNode, UnaryOperatorNode, ValueOperandNode } from '../parser/ast';
import { Parser } from "../parser/parser";
import { TokenType } from "../lexer/token";
import { Logger } from '../util/logger';

export class NodeVisitor {

  visit(node:AstNode):boolean {
    if (!node) {
      return null;
    }

    let visitorName:string = this.getMethodName(node);

    Logger.log(`Visiting: ${node} with method: ${visitorName}`);

    if (this[visitorName]) {
      return this[visitorName](node);
    } else {
      return this.genericVisit(node);
    }
  }

  private genericVisit(node:AstNode):boolean {
    throw `No visitor method: ${this.getMethodName(node)}`;
  }

  private getMethodName(node:AstNode):string {
    return `visit${node.name}`;
  }
}

export class Interpreter extends NodeVisitor {
  readonly resolver:Function;

  constructor(resolver?:Function) {
    super();

    this.resolver = resolver;
  }

  private error(node:AstNode):boolean {
    throw `Visitor cant process node token type: ${node.token.type}`;
  }

  private visitBinaryOperatorNode(node:BinaryOperatorNode):boolean {
    if (node.token.type === TokenType.AndOp) {
      return this.visit(node.left) && this.visit(node.right);
    } else if (node.token.type === TokenType.OrOp) {
      return this.visit(node.left) || this.visit(node.right);
    } else {
      this.error(node);
    }
  }

  private visitUnaryOperatorNode(node:UnaryOperatorNode):boolean {
    if (node.token.type === TokenType.NotOp) {
      return !this.visit(node.child);
    } else {
      this.error(node);
    }
  }

  private visitValueOperandNode(node:ValueOperandNode):boolean {
    if (node.value === 'true') {
      return true;
    } else if (node.value === 'false' || node.value === 'null') {
      return false;
    } else {
      return this.resolveValue(node.value);
    }
  }

  private resolveValue(value:string) {
    if (this.resolver) {
      let resolvedValue = !!this.resolver(value);

      Logger.log(`Resolved: ${value} to: ${resolvedValue}`);

      return resolvedValue;
    } else {
      throw `No resolver function but trying to resolve: ${value}`;
    }
  }
}
