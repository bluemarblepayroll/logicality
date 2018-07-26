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
var AstNode = (function () {
    function AstNode(token) {
        this.token = token;
        this.name = '';
    }
    AstNode.prototype.toString = function () {
        return "AstNode: " + this.token + "::" + this.name;
    };
    return AstNode;
}());
exports.AstNode = AstNode;
var BinaryOperatorNode = (function (_super) {
    __extends(BinaryOperatorNode, _super);
    function BinaryOperatorNode(left, token, right) {
        var _this = _super.call(this, token) || this;
        _this.name = 'BinaryOperatorNode';
        _this.left = left;
        _this.right = right;
        return _this;
    }
    return BinaryOperatorNode;
}(AstNode));
exports.BinaryOperatorNode = BinaryOperatorNode;
var UnaryOperatorNode = (function (_super) {
    __extends(UnaryOperatorNode, _super);
    function UnaryOperatorNode(child, token) {
        var _this = _super.call(this, token) || this;
        _this.name = 'UnaryOperatorNode';
        _this.child = child;
        return _this;
    }
    return UnaryOperatorNode;
}(AstNode));
exports.UnaryOperatorNode = UnaryOperatorNode;
var ValueOperandNode = (function (_super) {
    __extends(ValueOperandNode, _super);
    function ValueOperandNode(token) {
        var _this = _super.call(this, token) || this;
        _this.name = 'ValueOperandNode';
        _this.value = token.value;
        return _this;
    }
    return ValueOperandNode;
}(AstNode));
exports.ValueOperandNode = ValueOperandNode;
//# sourceMappingURL=ast.js.map