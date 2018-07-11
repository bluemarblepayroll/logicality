import { AstNode } from '../parser/ast';
export declare class NodeVisitor {
    visit(node: AstNode): boolean;
    private genericVisit;
    private getMethodName;
}
export declare class Interpreter extends NodeVisitor {
    readonly resolver: Function;
    constructor(resolver?: Function);
    private error;
    private visitBinaryOperatorNode;
    private visitUnaryOperatorNode;
    private visitValueOperandNode;
    private resolveValue;
}
