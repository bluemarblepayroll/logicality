/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from "../lexer/token";

export class AstNode {
  readonly token:Token;
  readonly name:string;

  constructor(token) {
    this.token = token;
    this.name = '';
  }

  toString() {
    return `AstNode: ${this.token}::${this.name}`;
  }
}

export class BinaryOperatorNode extends AstNode {
  readonly left:AstNode;
  readonly right:AstNode;
  readonly name:string;

  constructor(left:AstNode, token:Token, right:AstNode) {
    super(token);

    this.name = 'BinaryOperatorNode';
    this.left = left;
    this.right = right;
  }
}

export class UnaryOperatorNode extends AstNode {
  readonly child:AstNode;
  readonly name:string;

  constructor(child, token) {
    super(token);

    this.name = 'UnaryOperatorNode';
    this.child = child;
  }
}

export class ValueOperandNode extends AstNode {
  readonly value:string;
  readonly name:string;

  constructor(token) {
    super(token);

    this.name = 'ValueOperandNode';
    this.value = token.value;
  }
}
