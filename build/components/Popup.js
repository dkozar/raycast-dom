'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SUBMIT_BUTTON_ID = exports.CLOSE_BUTTON_ID = exports.POPUP_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactWrappyText = require('react-wrappy-text');

var _reactWrappyText2 = _interopRequireDefault(_reactWrappyText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POPUP_ID = exports.POPUP_ID = 'popup';
var CLOSE_BUTTON_ID = exports.CLOSE_BUTTON_ID = 'cancel';
var SUBMIT_BUTTON_ID = exports.SUBMIT_BUTTON_ID = 'submit';

var Popup = function (_Component) {
    _inherits(Popup, _Component);

    function Popup() {
        _classCallCheck(this, Popup);

        return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
    }

    _createClass(Popup, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'flex-parent-centered' },
                _react2.default.createElement(
                    'div',
                    { id: POPUP_ID, className: 'popup-dialog' },
                    _react2.default.createElement(
                        _reactWrappyText2.default,
                        { className: 'popup-dialog-header' },
                        'Popup dialog here'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'popup-dialog-content' },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Hello, user.'
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Clicking outside this of popup will close it.'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'It\'s easy to test a ray against element\'s "outside".'
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'p',
                            { className: 'popup-dialog-content-last' },
                            'You could visit the GitHub page by clicking the button below.'
                        ),
                        _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'popup-dialog-footer' },
                        _react2.default.createElement(
                            'button',
                            { className: 'toolbar-button', id: SUBMIT_BUTTON_ID },
                            _react2.default.createElement('span', { className: 'fa fa-github-alt' }),
                            ' Go to GitHub'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'toolbar-button', id: CLOSE_BUTTON_ID },
                            _react2.default.createElement('span', { className: 'fa fa-close' }),
                            ' Close'
                        )
                    )
                )
            );
        }
    }]);

    return Popup;
}(_react.Component);

exports.default = Popup;