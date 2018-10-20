/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TokenType } from "../lexer/token";
import { AstNode, BinaryOperatorNode, UnaryOperatorNode, ValueOperandNode } from "../parser/ast";
import { Logger } from "../util/logger";
import { NodeVisitor } from "./node_visitor";

export type ResolverFunction = (value: string) => boolean;

export class Interpreter extends NodeVisitor {
  private readonly resolver: ResolverFunction;

  constructor(resolver: ResolverFunction) {
    super();

    if (!resolver) {
      throw new Error("Resolver is required");
    }

    this.resolver = resolver;
  }

  private error(node: AstNode): boolean {
    throw new Error(`Visitor cant process node token type: ${node.token.type}`);
  }

  private visitBinaryOperatorNode(node: BinaryOperatorNode): boolean {
    if (node.token.type === TokenType.AndOp) {
      return this.visit(node.left) && this.visit(node.right);
    } else if (node.token.type === TokenType.OrOp) {
      return this.visit(node.left) || this.visit(node.right);
    } else {
      this.error(node);
    }
  }

  private visitUnaryOperatorNode(node: UnaryOperatorNode): boolean {
    if (node.token.type === TokenType.NotOp) {
      return !this.visit(node.child);
    } else {
      this.error(node);
    }
  }

  private visitValueOperandNode(node: ValueOperandNode): boolean {
    if (node.value === "true") {
      return true;
    } else if (node.value === "false" || node.value === "null") {
      return false;
    } else {
      return this.resolveValue(node.value);
    }
  }

  private resolveValue(value: string) {
    const resolvedValue = !!this.resolver(value);

    Logger.log(`Resolved: ${value} to: ${resolvedValue}`);

    return resolvedValue;
  }
}
