'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GITHUB_BUTTON_ID = exports.CLOSE_BUTTON_ID = exports.ABOUT_POPUP_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactWrappyText = require('react-wrappy-text');

var _reactWrappyText2 = _interopRequireDefault(_reactWrappyText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ABOUT_POPUP_ID = exports.ABOUT_POPUP_ID = 'about-popup';
var CLOSE_BUTTON_ID = exports.CLOSE_BUTTON_ID = 'cancel';
var GITHUB_BUTTON_ID = exports.GITHUB_BUTTON_ID = 'github';

var AboutPopup = function (_Component) {
    _inherits(AboutPopup, _Component);

    function AboutPopup() {
        _classCallCheck(this, AboutPopup);

        return _possibleConstructorReturn(this, (AboutPopup.__proto__ || Object.getPrototypeOf(AboutPopup)).apply(this, arguments));
    }

    _createClass(AboutPopup, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('div', { className: 'popup-overlay' }),
                _react2.default.createElement(
                    'div',
                    { className: 'flex-parent-centered' },
                    _react2.default.createElement(
                        'div',
                        { id: ABOUT_POPUP_ID, className: 'popup-dialog' },
                        _react2.default.createElement(
                            _reactWrappyText2.default,
                            { className: 'popup-dialog-header' },
                            'About'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'popup-dialog-content' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'This demo was built using ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'https://facebook.github.io/react/', target: '_blank' },
                                    'ReactJS'
                                ),
                                ' and ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'https://github.com/dkozar/raycast-dom', target: '_blank' },
                                    'Raycast'
                                ),
                                '.'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'It is a proof of concept that one could build relative complex apps using Raycast, without using any of the "classic" React event handlers.'
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'popup-dialog-content-last' },
                                'To see the code, please visit the project page on GitHub.'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'popup-dialog-footer' },
                            _react2.default.createElement(
                                'button',
                                { className: 'toolbar-button', id: GITHUB_BUTTON_ID },
                                _react2.default.createElement('span', { className: 'fa fa-github-alt' }),
                                '  Go to GitHub'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'toolbar-button', id: CLOSE_BUTTON_ID },
                                _react2.default.createElement('span', { className: 'fa fa-close' }),
                                '  Close'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AboutPopup;
}(_react.Component);

exports.default = AboutPopup;