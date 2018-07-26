"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var token_1 = require("../lexer/token");
var logger_1 = require("../util/logger");
var NodeVisitor = (function () {
    function NodeVisitor() {
    }
    NodeVisitor.prototype.visit = function (node) {
        if (!node) {
            return null;
        }
        var visitorName = this.getMethodName(node);
        logger_1.Logger.log("Visiting: " + node + " with method: " + visitorName);
        if (this[visitorName]) {
            return this[visitorName](node);
        }
        else {
            return this.genericVisit(node);
        }
    };
    NodeVisitor.prototype.genericVisit = function (node) {
        throw "No visitor method: " + this.getMethodName(node);
    };
    NodeVisitor.prototype.getMethodName = function (node) {
        return "visit" + node.name;
    };
    return NodeVisitor;
}());
exports.NodeVisitor = NodeVisitor;
var Interpreter = (function (_super) {
    __extends(Interpreter, _super);
    function Interpreter(resolver) {
        var _this = _super.call(this) || this;
        _this.resolver = resolver;
        return _this;
    }
    Interpreter.prototype.error = function (node) {
        throw "Visitor cant process node token type: " + node.token.type;
    };
    Interpreter.prototype.visitBinaryOperatorNode = function (node) {
        if (node.token.type === token_1.TokenType.AndOp) {
            return this.visit(node.left) && this.visit(node.right);
        }
        else if (node.token.type === token_1.TokenType.OrOp) {
            return this.visit(node.left) || this.visit(node.right);
        }
        else {
            this.error(node);
        }
    };
    Interpreter.prototype.visitUnaryOperatorNode = function (node) {
        if (node.token.type === token_1.TokenType.NotOp) {
            return !this.visit(node.child);
        }
        else {
            this.error(node);
        }
    };
    Interpreter.prototype.visitValueOperandNode = function (node) {
        if (node.value === 'true') {
            return true;
        }
        else if (node.value === 'false' || node.value === 'null') {
            return false;
        }
        else {
            return this.resolveValue(node.value);
        }
    };
    Interpreter.prototype.resolveValue = function (value) {
        if (this.resolver) {
            var resolvedValue = !!this.resolver(value);
            logger_1.Logger.log("Resolved: " + value + " to: " + resolvedValue);
            return resolvedValue;
        }
        else {
            throw "No resolver function but trying to resolve: " + value;
        }
    };
    return Interpreter;
}(NodeVisitor));
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map