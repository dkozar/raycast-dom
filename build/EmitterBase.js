'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Ray = require('./Ray');

var _Ray2 = _interopRequireDefault(_Ray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmitterBase = function () {

    //<editor-fold desc="Constructor">
    function EmitterBase() {
        _classCallCheck(this, EmitterBase);

        this.slots = [];
    }
    //</editor-fold>

    //<editor-fold desc="Connect/disconnect">
    // TODO: slot v2.0 should contain:
    // slot = {
    //     handlers, // current slot data
    //     elements, // array od elements to check for intersection before emitting a ray
    //     phase, // capture/bubbling phase
    //     useDetachedRays // fire detached rays
    // }


    _createClass(EmitterBase, [{
        key: 'connect',
        value: function connect(slot) {
            var len;

            if (this.isConnected(slot)) {
                return;
            }
            len = this.slots.length;
            this.slots.push(slot);
            this.handleSubscription(len, this.slots.length);
        }
    }, {
        key: 'disconnect',
        value: function disconnect(slot) {
            var len = this.slots.length;

            _lodash2.default.remove(this.slots, function (subscriber) {
                return subscriber === slot;
            });
            this.handleSubscription(len, this.slots.length);
        }
    }, {
        key: 'isConnected',
        value: function isConnected(slot) {
            return _lodash2.default.some(this.slots, function (subscriber) {
                return subscriber === slot;
            });
        }
        //</editor-fold>

        //<editor-fold desc="Subscription">
        /**
         * Abstract
         * @param previousCount
         * @param nextCount
         */

    }, {
        key: 'handleSubscription',
        value: function handleSubscription(previousCount, nextCount) {}
        // abstract

        //</editor-fold>

        //<editor-fold desc="Emitting">

    }, {
        key: 'createRayAndEmit',
        value: function createRayAndEmit(handlerName, root, e) {
            var ray;

            e = e || window.event;

            ray = new _Ray2.default(e, root, {
                x: e.clientX,
                y: e.clientY
            });

            this.emit(handlerName, ray);
        }
    }, {
        key: 'emit',
        value: function emit(handlerName, ray) {
            var handler;

            _lodash2.default.forEach(this.slots, function (slot) {
                if (slot) {
                    // might be undefined because firing some handlers could disconnect others (recursion)
                    handler = slot[handlerName];

                    // useDetachedRays - a switch *per slot object* (with false as default)
                    if (ray && !ray.isAttached() && !slot.useDetachedRays) {
                        console.warn('Ray has been detached', ray.toString());
                        return false;
                    }

                    // TODO: if slot connected providing the 'elements' array, check for intersections of ray and any of the element. Emit only when intersection exists.
                    if (handler) {
                        handler(ray);
                    }
                }
            });
        }
        //</editor-fold>

    }]);

    return EmitterBase;
}();

exports.default = EmitterBase;