'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BottomToolbar = require('./components/BottomToolbar');

var _BottomToolbar2 = _interopRequireDefault(_BottomToolbar);

var _Circle = require('./components/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _CircleOps = require('./util/CircleOps');

var _CircleOps2 = _interopRequireDefault(_CircleOps);

var _Emitter = require('./Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Popup = require('./components/Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Svg = require('./components/Svg');

var _Svg2 = _interopRequireDefault(_Svg);

var _TextRotator = require('./components/TextRotator');

var _TextRotator2 = _interopRequireDefault(_TextRotator);

var _reactWrappyText = require('react-wrappy-text');

var _reactWrappyText2 = _interopRequireDefault(_reactWrappyText);

var _colors = require('./util/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./styles/main.css');

var rootNode, canvasNode;

//<editor-fold desc="Helper functions">
function getCircleId(circleElement) {
    return parseInt(circleElement.id.split('-')[1]);
}
//</editor-fold>

var App = exports.App = function (_Component) {
    _inherits(App, _Component);

    //<editor-fold desc="Constructor">
    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            circles: [{
                x: 150, y: 500, r: 100, color: _colors.BLUE
            }, {
                x: 700, y: 250, r: 150, color: _colors.YELLOW
            }, {
                x: 800, y: 700, r: 80, color: _colors.PURPLE
            }],
            hoveredCircleIndex: -1,
            selectedCircleIndex: -1,
            popupVisible: false,
            mousePosition: {
                x: 0,
                y: 0
            }
        };

        _this.executeCommand = _this.executeCommand.bind(_this);

        // Raycast Emitter subscription
        _Emitter2.default.getInstance().connect({
            onMouseOver: _this.onMouseOver.bind(_this), // circle mouse over
            onMouseOut: _this.onMouseOut.bind(_this), // circle mouse out
            onMouseMove: _this.onMouseMove.bind(_this), // drawing circles with Alt key
            onMouseDown: _this.onMouseDown.bind(_this), // drawing circles
            onMouseUp: _this.onMouseUp.bind(_this), // stop drawing circles with Alt key
            onClick: _this.onClick.bind(_this), // button clicks
            onKeyUp: _this.onKeyUp.bind(_this), // closing dialog
            onTouchStart: _this.onTouchStart.bind(_this) // new circle
        });
        return _this;
    }
    //</editor-fold>

    //<editor-fold desc="Raycast">


    _createClass(App, [{
        key: 'onMouseOver',
        value: function onMouseOver(ray) {
            var circle = ray.intersectsId(_Circle.CIRCLE_ID_PREFIX),
                circleId,
                circleIndex;

            if (circle) {
                // circle mouse over
                circleId = circle.id;
                circleIndex = parseInt(circleId.split(_Circle.CIRCLE_ID_PREFIX)[1]);
                this.setState({
                    hoveredCircleIndex: circleIndex
                });
            }
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut(ray) {
            var circle = ray.intersectsId(_Circle.CIRCLE_ID_PREFIX);

            if (circle) {
                // circle mouse over
                this.setState({
                    hoveredCircleIndex: -1
                });
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(ray) {
            var self = this,
                circle,
                circleId,
                circleIndex;

            if (this.state.popupVisible) {
                if (!ray.intersectsId(_Popup.POPUP_ID)) {
                    this.setState({
                        popupVisible: false
                    });
                }
                return;
            }

            if (!ray.intersects(canvasNode)) {
                return;
            }

            circle = ray.intersectsId(_Circle.CIRCLE_ID_PREFIX);

            if (circle) {
                // circle mouse down
                circleId = circle.id;
                circleIndex = parseInt(circleId.split(_Circle.CIRCLE_ID_PREFIX)[1]);
                this.setState({
                    selectedCircleIndex: circleIndex
                }, function () {
                    self.executeCommand('bring-to-front');
                    self.selectLastCircle();
                });
            } else {
                // canvas mouse down
                this.setState({
                    mousePosition: ray.position,
                    selectedCircleIndex: -1
                }, function () {
                    self.executeCommand('new-circle');
                    self.selectLastCircle();
                });
            }

            this.setState({
                mouseIsDown: true,
                mousePosition: ray.position
            }, function () {
                if (ray.e.altKey) {
                    if (ray.e.shiftKey) {
                        self.executeCommand('clear'); // Alt + Shift + click = clear
                    } else if (ray.intersects(canvasNode)) {
                        self.executeCommand('new-circle'); // Alt + click = new circle
                        self.selectLastCircle();
                    }
                }
            });
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(ray) {
            console.log('onTouchStart', ray);
            var touch = ray.e.changedTouches[0];

            ray.position = {
                x: touch.clientX,
                y: touch.clientY
            };
            this.onMouseDown(ray);
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            this.setState({
                mouseIsDown: false
            });
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(ray) {
            var self = this;

            if (!ray.e.altKey || !this.state.mouseIsDown || !ray.intersects(canvasNode)) {
                return;
            }

            this.setState({
                mousePosition: ray.position
            }, function () {
                self.executeCommand('new-circle'); // Alt + mouse move = new circle
            });
        }
    }, {
        key: 'onClick',
        value: function onClick(ray) {
            var self = this;

            if (ray.intersectsId(_BottomToolbar.NEW_BUTTON_ID)) {
                self.executeCommand('new-circle');
            } else if (ray.intersectsId(_BottomToolbar.CLEAR_BUTTON_ID)) {
                self.executeCommand('clear');
            } else if (ray.intersectsId(_BottomToolbar.OPEN_BUTTON_ID)) {
                self.setState({
                    popupVisible: true
                });
            } else if (ray.intersectsId(_Popup.CLOSE_BUTTON_ID)) {
                self.setState({
                    popupVisible: false
                });
            } else if (ray.intersectsId(_Popup.SUBMIT_BUTTON_ID)) {
                window.open('https://github.com/dkozar/raycast-dom', '_blank');
            }
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(ray) {
            if (ray.e.key === 'Escape') {
                // close dialog
                this.setState({
                    popupVisible: false
                });
            }
        }
        //</editor-fold>

        //<editor-fold desc="Circles & commands">

    }, {
        key: 'selectCircle',
        value: function selectCircle(circleElement) {
            this.state.selectedCircleIndex = getCircleId(circleElement);
        }
    }, {
        key: 'selectLastCircle',
        value: function selectLastCircle() {
            this.setState({
                selectedCircleIndex: this.state.circles.length - 1
            });
        }
    }, {
        key: 'executeCommand',
        value: function executeCommand(command) {
            var position, circles;

            position = this.state.mousePosition;
            circles = _CircleOps2.default.executeCommand(command, this.state.circles, this.state.selectedCircleIndex, position);
            this.setState({ circles: circles });
        }
        //</editor-fold>

        //<editor-fold desc="React">

    }, {
        key: 'render',
        value: function render() {
            var self = this,
                index = 0,
                circles = this.state.circles.map(function (item) {
                var id = _Circle.CIRCLE_ID_PREFIX + index,
                    circle = _react2.default.createElement(_Circle2.default, _extends({}, item, {
                    id: id,
                    key: id,
                    strokeColor: 'white',
                    hovered: self.state.hoveredCircleIndex === index,
                    selected: self.state.selectedCircleIndex === index }));

                index++;
                return circle;
            }),
                popup = this.state.popupVisible && _react2.default.createElement(_Popup2.default, null);

            return _react2.default.createElement(
                'div',
                { ref: 'root' },
                _react2.default.createElement(
                    'div',
                    { ref: 'canvas', className: 'container' },
                    _react2.default.createElement(_Logo2.default, null),
                    _react2.default.createElement(
                        _Svg2.default,
                        { width: '100%', height: '100%' },
                        circles
                    ),
                    _react2.default.createElement(_TextRotator2.default, null),
                    popup
                ),
                _react2.default.createElement(_BottomToolbar2.default, null)
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            rootNode = _reactDom2.default.findDOMNode(this.refs.root);
            canvasNode = _reactDom2.default.findDOMNode(this.refs.canvas);
        }
        //</editor-fold>

    }]);

    return App;
}(_react.Component);