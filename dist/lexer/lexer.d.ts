import { Token } from "./token";
export interface Lexer {
    expression: string;
    getNextToken(): Token;
    reset(): void;
}
export declare class SimpleLexer implements Lexer {
    readonly expression: string;
    private readonly grammar;
    private matches;
    private currentIndex;
    constructor(expression: string);
    getNextToken(): Token;
    reset(): void;
    private invalidMatches;
    private getMatches;
    private tokenize;
    private pattern;
    private invalidPattern;
}
