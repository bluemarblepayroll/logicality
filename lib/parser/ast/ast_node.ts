/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from "../../lexer/token";

export class AstNode {
  public readonly token: Token;
  public readonly name: string;

  constructor(token) {
    this.token = token;
    this.name = "";
  }

  public toString(): string {
    return `AstNode: ${this.token}::${this.name}`;
  }
}
