"use strict";
exports.__esModule = true;
var token_1 = require("../lexer/token");
var ast_1 = require("./ast");
var Parser = (function () {
    function Parser(lexer) {
        if (!lexer) {
            throw 'Lexer is required';
        }
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
        if (!this.currentToken) {
            throw 'Lexer must contain at least one token';
        }
    }
    Parser.prototype.error = function () {
        throw 'Invalid parser syntax';
    };
    Parser.prototype.eat = function (type) {
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getNextToken();
        }
        else {
            this.error();
        }
    };
    Parser.prototype.factor = function () {
        var token = this.currentToken;
        if (token.type === token_1.TokenType.Value) {
            this.eat(token_1.TokenType.Value);
            return new ast_1.ValueOperandNode(token);
        }
        else if (token.type === token_1.TokenType.LeftParen) {
            this.eat(token_1.TokenType.LeftParen);
            var node = this.expr();
            this.eat(token_1.TokenType.RightParen);
            return node;
        }
        else if (token.type === token_1.TokenType.NotOp) {
            this.eat(token_1.TokenType.NotOp);
            var node = this.expr();
            return new ast_1.UnaryOperatorNode(node, token);
        }
        else {
            throw "Factor cannot determine what to do with: " + token;
        }
    };
    Parser.prototype.expr = function () {
        var node = this.factor();
        while (this.currentToken &&
            (this.currentToken.type === token_1.TokenType.AndOp ||
                this.currentToken.type === token_1.TokenType.OrOp)) {
            var token = this.currentToken;
            if (token.type === token_1.TokenType.AndOp) {
                this.eat(token_1.TokenType.AndOp);
            }
            else if (token.type === token_1.TokenType.OrOp) {
                this.eat(token_1.TokenType.OrOp);
            }
            node = new ast_1.BinaryOperatorNode(node, token, this.factor());
        }
        return node;
    };
    Parser.prototype.parse = function () {
        return this.expr();
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map