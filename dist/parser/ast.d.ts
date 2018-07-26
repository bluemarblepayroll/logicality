import { Token } from "../lexer/token";
export declare class AstNode {
    readonly token: Token;
    readonly name: string;
    constructor(token: any);
    toString(): string;
}
export declare class BinaryOperatorNode extends AstNode {
    readonly left: AstNode;
    readonly right: AstNode;
    readonly name: string;
    constructor(left: AstNode, token: Token, right: AstNode);
}
export declare class UnaryOperatorNode extends AstNode {
    readonly child: AstNode;
    readonly name: string;
    constructor(child: any, token: any);
}
export declare class ValueOperandNode extends AstNode {
    readonly value: string;
    readonly name: string;
    constructor(token: any);
}
