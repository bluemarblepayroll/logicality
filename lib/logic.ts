/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Interpreter, ResolverFunction as InterpreterResolverFunction } from "./interpreter/interpreter";
import { NodeVisitor } from "./interpreter/node_visitor";
import { ILexer, SimpleLexer } from "./lexer/lexer";
import { AstNode } from "./parser/ast/ast_node";
import { Parser } from "./parser/parser";

// tslint:disable-next-line:no-namespace
export namespace Logic {
  export type IResolverFunction = (value: string, input: any) => boolean;

  const objectResolver: IResolverFunction = (value: string, input: any): boolean => input && !!input[value];

  const cache: Record<string, AstNode> = {};

  function resolverWrapper(input: any, resolver: IResolverFunction): InterpreterResolverFunction {
    if (resolver) {
      return (expr: string) => resolver(expr, input);
    }

    return (expr: string) => objectResolver(expr, input);
  }

  function get(expression: string): AstNode {
    if (cache[expression]) {
      return cache[expression];
    }

    const lexer: ILexer = new SimpleLexer(expression);
    const parser: Parser = new Parser(lexer);

    return cache[expression] = parser.parse();
  }

  export function evaluate(expression: string, input: any, resolver?: IResolverFunction): boolean {
    const rootNode: AstNode = get(expression);
    const wrapper: InterpreterResolverFunction = resolverWrapper(input, resolver);
    const interpreter: NodeVisitor = new Interpreter(wrapper);

    return interpreter.visit(rootNode);
  }
}
