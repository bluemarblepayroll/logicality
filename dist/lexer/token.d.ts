export declare enum TokenType {
    Value = "VALUE",
    AndOp = "AND_OP",
    OrOp = "OR_OP",
    NotOp = "NOT_OP",
    LeftParen = "LEFT_PAREN",
    RightParen = "RIGHT_PAREN"
}
export declare class Token {
    readonly type: TokenType;
    readonly value: string;
    constructor(type: TokenType, value: string);
}
