"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @see https://github.com/dkozar/edriven-gui/blob/master/eDriven/eDriven.Core/Geom/Point.cs

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "add",
        value: function add(other) {
            return new Point(this.x + other.x, this.y + other.y);
        }
    }, {
        key: "subtract",
        value: function subtract(other) {
            return new Point(this.x - other.x, this.y - other.y);
        }
    }, {
        key: "toObject",
        value: function toObject() {
            return {
                x: this.x,
                y: this.y
            };
        }
    }], [{
        key: "fromObject",
        value: function fromObject(obj) {
            return new Point(obj.x, obj.y);
        }
    }]);

    return Point;
}();

exports.default = Point;