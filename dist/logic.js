"use strict";
exports.__esModule = true;
var lexer_1 = require("./lexer/lexer");
var parser_1 = require("./parser/parser");
var interpreter_1 = require("./interpreter/interpreter");
var Logic;
(function (Logic) {
    var objectResolver = function (value, input) { return input && !!input[value]; };
    var cache = {};
    function resolverWrapper(input, resolver) {
        if (resolver) {
            return function (expr) { return resolver(expr, input); };
        }
        return function (expr) { return objectResolver(expr, input); };
    }
    function get(expression) {
        if (cache[expression]) {
            return cache[expression];
        }
        var lexer = new lexer_1.SimpleLexer(expression);
        var parser = new parser_1.Parser(lexer);
        return cache[expression] = parser.parse();
    }
    function evaluate(expression, input, resolver) {
        var rootNode = get(expression);
        var wrapper = resolverWrapper(input, resolver);
        var interpreter = new interpreter_1.Interpreter(wrapper);
        return interpreter.visit(rootNode);
    }
    Logic.evaluate = evaluate;
})(Logic = exports.Logic || (exports.Logic = {}));
//# sourceMappingURL=logic.js.map