"use strict";
exports.__esModule = true;
var token_1 = require("./token");
var grammar_1 = require("./grammar");
var SimpleLexer = (function () {
    function SimpleLexer(expression) {
        if (!expression) {
            throw 'Expression is required';
        }
        this.grammar = grammar_1.simpleGrammar;
        this.expression = expression;
        var invalid = this.invalidMatches();
        if (invalid) {
            throw "Invalid lexer syntax: " + invalid;
        }
        this.matches = this.getMatches();
        this.currentIndex = -1;
    }
    SimpleLexer.prototype.getNextToken = function () {
        this.currentIndex++;
        if (this.currentIndex > this.matches.length - 1) {
            return null;
        }
        return this.matches[this.currentIndex];
    };
    SimpleLexer.prototype.reset = function () {
        this.currentIndex = -1;
    };
    SimpleLexer.prototype.invalidMatches = function () {
        return this.expression.replace(this.invalidPattern(), '');
    };
    SimpleLexer.prototype.getMatches = function () {
        var _this = this;
        var matched = this.expression.match(this.pattern()) || [];
        return matched.map(function (m) { return _this.tokenize(m); });
    };
    SimpleLexer.prototype.tokenize = function (str) {
        for (var _i = 0, _a = Object.keys(this.grammar); _i < _a.length; _i++) {
            var key = _a[_i];
            var regex = this.grammar[key];
            var type = key.charAt(0).toUpperCase() + key.slice(1);
            if (regex.test(str)) {
                return new token_1.Token(token_1.TokenType[type], str);
            }
        }
        return null;
    };
    SimpleLexer.prototype.pattern = function () {
        var _this = this;
        var pattern = Object.keys(this.grammar)
            .map(function (key) { return "(" + _this.grammar[key].source + ")"; })
            .join('|');
        return new RegExp(pattern, 'g');
    };
    SimpleLexer.prototype.invalidPattern = function () {
        var pattern = this.pattern();
        var invalidPattern = pattern.source + "|(\\s*)";
        return new RegExp(invalidPattern, 'g');
    };
    return SimpleLexer;
}());
exports.SimpleLexer = SimpleLexer;
//# sourceMappingURL=lexer.js.map