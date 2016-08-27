"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomUtil = function () {
    function DomUtil() {
        _classCallCheck(this, DomUtil);
    }

    _createClass(DomUtil, null, [{
        key: "buildPath",
        value: function buildPath(parentElement, childElement) {
            var path = [],
                node;

            path.push(childElement);

            if (childElement === parentElement) {
                return path;
            }

            node = childElement.parentNode;

            while (node != null) {
                path.push(node);
                if (node === parentElement) {
                    return path;
                }
                node = node.parentNode;
            }
            return false; // not a real path
        }
    }]);

    return DomUtil;
}();

exports.default = DomUtil;