/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ILexer, SimpleLexer } from "./lexer/lexer";
import { AstNode } from "./parser/ast/ast_node";
import { Parser } from "./parser/parser";
import { Interpreter, ResolverFunction as InterpreterResolverFunction } from "./interpreter/interpreter";
import { NodeVisitor } from "./interpreter/node_visitor";

export namespace Logic {

  export interface ResolverFunction {
    (value: tring, input: any): boolean;
  }

  const objectResolver:ResolverFunction = (value: string, input: any): boolean => input && !!input[value];

  const cache:Record<string,AstNode> = {};

  function resolverWrapper(input: any, resolver: Function): InterpreterResolverFunction {
    if (resolver) {
      return (expr: string) => resolver(expr, input);
    }

    return (expr:string) => objectResolver(expr, input);
  }

  function get(expression: string): AstNode {
    if (cache[expression]) {
      return cache[expression];
    }

    let lexer: ILexer = new SimpleLexer(expression);
    let parser: Parser = new Parser(lexer);

    return cache[expression] = parser.parse();
  }

  export function evaluate(expression: string, input: any, resolver?: ResolverFunction): boolean {
    let rootNode: AstNode = get(expression);
    let wrapper: InterpreterResolverFunction = resolverWrapper(input, resolver);
    let interpreter: NodeVisitor = new Interpreter(wrapper);

    return interpreter.visit(rootNode);
  }
}
