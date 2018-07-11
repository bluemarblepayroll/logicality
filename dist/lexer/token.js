"use strict";
exports.__esModule = true;
var TokenType;
(function (TokenType) {
    TokenType["Value"] = "VALUE";
    TokenType["AndOp"] = "AND_OP";
    TokenType["OrOp"] = "OR_OP";
    TokenType["NotOp"] = "NOT_OP";
    TokenType["LeftParen"] = "LEFT_PAREN";
    TokenType["RightParen"] = "RIGHT_PAREN";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var Token = (function () {
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=token.js.map