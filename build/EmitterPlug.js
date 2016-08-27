'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Emitter = require('./Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

var _EmitterBase2 = require('./EmitterBase');

var _EmitterBase3 = _interopRequireDefault(_EmitterBase2);

var _Ray = require('./Ray');

var _Ray2 = _interopRequireDefault(_Ray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A plug that could be subclassed
 * Connects to Emitter passing this.handlers (defined by subclass)
 */
var EmitterPlug = function (_EmitterBase) {
    _inherits(EmitterPlug, _EmitterBase);

    //<editor-fold desc="Constructor">
    function EmitterPlug() {
        _classCallCheck(this, EmitterPlug);

        var _this = _possibleConstructorReturn(this, (EmitterPlug.__proto__ || Object.getPrototypeOf(EmitterPlug)).call(this));

        _this.emitter = _Emitter2.default.getInstance();
        return _this;
    }
    //</editor-fold>

    //<editor-fold desc="Emitter subscription">


    _createClass(EmitterPlug, [{
        key: 'handleSubscription',
        value: function handleSubscription(previousCount, nextCount) {
            if (previousCount === 0 && nextCount >= 1) {
                this.emitter.connect(this.handlers);
            } else if (previousCount && nextCount === 0) {
                this.emitter.disconnect(this.handlers);
            }
        }
        //</editor-fold>

    }]);

    return EmitterPlug;
}(_EmitterBase3.default);

exports.default = EmitterPlug;