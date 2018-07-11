/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Lexer, SimpleLexer } from "./lexer/lexer";
import { AstNode } from "./parser/ast";
import { Parser } from "./parser/parser";
import { NodeVisitor, Interpreter } from "./interpreter/interpreter";

export namespace Logic {

  export interface ResolverFunction {
    (value:string, input:any):boolean;
  }

  const objectResolver:ResolverFunction = (value:string, input:any):boolean => input && !!input[value];

  const cache:Record<string,AstNode> = {};

  function resolverWrapper(input:any, resolver:Function):Function {
    if (resolver) {
      return (expr:string) => resolver(expr, input);
    }

    return (expr:string) => objectResolver(expr, input);
  }

  function get(expression:string):AstNode {
    if (cache[expression]) {
      return cache[expression];
    }

    let lexer:Lexer = new SimpleLexer(expression);
    let parser:Parser = new Parser(lexer);

    return cache[expression] = parser.parse();
  }

  export function evaluate(expression:string, input:any, resolver?:ResolverFunction):boolean {
    let rootNode:AstNode = get(expression);
    let wrapper:Function = resolverWrapper(input, resolver);
    let interpreter:NodeVisitor = new Interpreter(wrapper);

    return interpreter.visit(rootNode);
  }

}
