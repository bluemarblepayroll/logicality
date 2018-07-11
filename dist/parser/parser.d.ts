import { Lexer } from "../lexer/lexer";
import { TokenType } from "../lexer/token";
import { AstNode } from './ast';
export declare class Parser {
    readonly lexer: Lexer;
    private currentToken;
    constructor(lexer: Lexer);
    error(): void;
    eat(type: TokenType): void;
    factor(): AstNode;
    expr(): AstNode;
    parse(): AstNode;
}
