"use strict";
exports.__esModule = true;
var Logger;
(function (Logger) {
    var turnedOn = false;
    function on() {
        turnedOn = true;
    }
    Logger.on = on;
    function off() {
        turnedOn = false;
    }
    Logger.off = off;
    function log(msg) {
        if (turnedOn && console && console.log) {
            console.log("[LOG] " + msg);
        }
    }
    Logger.log = log;
})(Logger = exports.Logger || (exports.Logger = {}));
//# sourceMappingURL=logger.js.map