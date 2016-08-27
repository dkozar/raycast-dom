'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dom = require('./util/dom');

var _dom2 = _interopRequireDefault(_dom);

var _evaluateID = require('./lookup/evaluateID');

var _evaluateID2 = _interopRequireDefault(_evaluateID);

var _evaluateClassName = require('./lookup/evaluateClassName');

var _evaluateClassName2 = _interopRequireDefault(_evaluateClassName);

var _equalID = require('./lookup/equalID');

var _equalID2 = _interopRequireDefault(_equalID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ray emitted by an emitter
 */
var Ray = function () {

    /**
     * @param e Event
     * @param root Root element (optional, defaults to document)
     * @param position Position in screen coordinates (optional)
     */
    function Ray(e, root, position) {
        _classCallCheck(this, Ray);

        this.e = e;
        this.target = e.target;
        this.root = root || document;
        this.position = position;
    }

    /**
     * @Private
     * Gets the reversed (bottom up)
     * @returns {*} Array of DOM nodes
     */


    _createClass(Ray, [{
        key: '_getPath',
        value: function _getPath() {
            if (!this.path) {
                // be lazy for performance
                this.path = _dom2.default.buildPath(this.root, this.target);
            }
            return this.path;
        }

        /**
         * Gets intersections (bottom-up)
         * @returns {*} Array of DOM nodes
         */

    }, {
        key: 'getIntersections',
        value: function getIntersections(topDown) {
            var bottomUpPath = this._getPath();

            if (!topDown) {
                return bottomUpPath;
            }

            if (!this.topDownPath) {
                // be lazy for performance
                this.topDownPath = _lodash2.default.reverse(bottomUpPath);
            }

            return this.topDownPath;
        }

        /**
         * Checks if the ray is attached to the DOM
         * @returns {boolean}
         */

    }, {
        key: 'isAttached',
        value: function isAttached() {
            var reversed = this._getPath();

            //return reversed && reversed[reversed.length - 1] === this.parentElement;
            return !!reversed;
        }

        //<editor-fold desc="Ray operations">
        /**
         * Returns true if path intersects node
         * @param node
         * @returns {boolean}
         */

    }, {
        key: 'intersects',
        value: function intersects(node) {
            var path = this._getPath();

            return path && path.indexOf(node) > -1;
        }

        /**
         * Returns node with specified ID if ray intersects it, otherwise false
         * @param id ID to check for
         * @param strict If true, look for exact ID. If false, use substring.
         * @returns {*}
         */

    }, {
        key: 'intersectsId',
        value: function intersectsId(id, strict) {
            var func = strict ? _equalID2.default : _evaluateID2.default;

            return this.findNode(_lodash2.default.partial(func, id)) || false;
        }

        /**
         * Returns node with specified className if ray intersects it, otherwise false
         * @param id ID to check for
         * @returns {*}
         */

    }, {
        key: 'intersectsClass',
        value: function intersectsClass(className) {
            return this.findNode(_lodash2.default.partial(_evaluateClassName2.default, className));
        }

        /**
         * Finds the node using a predicate
         * @param predicate Function accepting and item and returning boolean (match)
         * @param topDown Should we start from root
         * @returns {*}
         */

    }, {
        key: 'findNode',
        value: function findNode(predicate, topDown) {
            var path = this._getPath();

            return topDown ? _lodash2.default.findLast(path, predicate) : _lodash2.default.find(path, predicate);
        }
        //</editor-fold>

        //<editor-fold desc="Event operations">

    }, {
        key: 'preventDefault',
        value: function preventDefault() {
            this.e.preventDefault();
        }
        //</editor-fold>

        //<editor-fold desc="toString">

    }, {
        key: 'toString',
        value: function toString() {
            return 'Ray(' + this._getPath().length + ' intersections)';
        }
        //</editor-fold>

    }]);

    return Ray;
}();

exports.default = Ray;