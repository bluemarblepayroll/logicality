export interface Grammar {
    value: RegExp;
    andOp: RegExp;
    orOp: RegExp;
    notOp: RegExp;
    leftParen: RegExp;
    rightParen: RegExp;
}
export declare const simpleGrammar: Grammar;
