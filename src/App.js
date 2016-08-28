import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BottomToolbar, { NEW_BUTTON_ID, CLEAR_BUTTON_ID, OPEN_BUTTON_ID } from './components/BottomToolbar';
import Circle from './components/Circle';
import { CIRCLE_ID_PREFIX } from './components/Circle';
import CircleOps from './util/CircleOps';
import Emitter from './Emitter';
import Logo from './components/Logo';
import Popup, { POPUP_ID, CLOSE_BUTTON_ID, SUBMIT_BUTTON_ID } from './components/Popup';
import Svg from './components/Svg';
import TextRotator from './components/TextRotator';
import WrappyText from 'react-wrappy-text';

import { BLUE, YELLOW, PURPLE } from './util/colors';

require('./styles/main.css');

var rootNode, canvasNode;

//<editor-fold desc="Helper functions">
function getCircleId(circleElement) {
    return parseInt(circleElement.id.split('-')[1]);
}
//</editor-fold>

export class App extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.state = {
            circles: [
                {
                    x: 150, y: 500, r: 100, color: BLUE
                },
                {
                    x: 700, y: 250, r: 150, color: YELLOW
                },
                {
                    x: 800, y: 700, r: 80, color: PURPLE
                }
            ],
            hoveredCircleIndex: -1,
            selectedCircleIndex: -1,
            popupVisible: false,
            mousePosition: {
                x: 0,
                y: 0
            }
        };

        this.executeCommand = this.executeCommand.bind(this);

        // Raycast Emitter subscription
        Emitter.getInstance().connect({
            onMouseOver: this.onMouseOver.bind(this), // circle mouse over
            onMouseOut: this.onMouseOut.bind(this), // circle mouse out
            onMouseMove: this.onMouseMove.bind(this), // drawing circles with Alt key
            onMouseDown: this.onMouseDown.bind(this), // drawing circles
            onMouseUp: this.onMouseUp.bind(this), // stop drawing circles with Alt key
            onClick: this.onClick.bind(this), // button clicks
            onKeyUp: this.onKeyUp.bind(this), // closing dialog
            onTouchStart: this.onTouchStart.bind(this) // new circle
        });
    }
    //</editor-fold>

    //<editor-fold desc="Raycast">
    onMouseOver(ray) {
        var circle = ray.intersectsId(CIRCLE_ID_PREFIX),
            circleId, circleIndex;

        if (circle) {
            // circle mouse over
            circleId = circle.id;
            circleIndex = parseInt(circleId.split(CIRCLE_ID_PREFIX)[1]);
            this.setState({
                hoveredCircleIndex: circleIndex
            });
        }
    }

    onMouseOut(ray) {
        var circle = ray.intersectsId(CIRCLE_ID_PREFIX);

        if (circle) {
            // circle mouse over
            this.setState({
                hoveredCircleIndex: -1
            });
        }
    }

    onMouseDown(ray) {
        var self = this,
            circle, circleId, circleIndex;

        if (this.state.popupVisible) {
            if (!ray.intersectsId(POPUP_ID)) {
                this.setState({
                    popupVisible: false
                });
            }
            return;
        }

        if (!ray.intersects(canvasNode)) {
            return;
        }

        circle = ray.intersectsId(CIRCLE_ID_PREFIX);

        if (circle) { // circle mouse down
            circleId = circle.id;
            circleIndex = parseInt(circleId.split(CIRCLE_ID_PREFIX)[1]);
            this.setState({
                selectedCircleIndex: circleIndex
            }, function() {
                self.executeCommand('bring-to-front');
                self.selectLastCircle();
            });
        } else { // canvas mouse down
            this.setState({
                mousePosition: ray.position,
                selectedCircleIndex: -1
            }, function() {
                self.executeCommand('new-circle');
                self.selectLastCircle();
            });
        }

        this.setState({
            mouseIsDown: true,
            mousePosition: ray.position
        }, function() {
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

    onTouchStart(ray) {
        console.log('onTouchStart', ray);
        var touch = ray.e.changedTouches[0];

        ray.position = {
            x: touch.clientX,
            y: touch.clientY
        };
        this.onMouseDown(ray);
    }

    onMouseUp() {
        this.setState({
            mouseIsDown: false
        });
    }

    onMouseMove(ray) {
        var self = this;

        if (!ray.e.altKey || !this.state.mouseIsDown || !ray.intersects(canvasNode)) {
            return;
        }

        this.setState({
            mousePosition: ray.position
        }, function() {
            self.executeCommand('new-circle'); // Alt + mouse move = new circle
        });
    }

    onClick(ray) {
        var self = this;

        if (ray.intersectsId(NEW_BUTTON_ID)) {
            self.executeCommand('new-circle');
        } else if (ray.intersectsId(CLEAR_BUTTON_ID)) {
            self.executeCommand('clear');
        } else if (ray.intersectsId(OPEN_BUTTON_ID)) {
            self.setState({
                popupVisible: true
            });
        } else if (ray.intersectsId(CLOSE_BUTTON_ID)) {
            self.setState({
                popupVisible: false
            });
        } else if (ray.intersectsId(SUBMIT_BUTTON_ID)) {
            window.open('https://github.com/dkozar/raycast-dom', '_blank');
        }
    }

    onKeyUp(ray) {
        if (ray.e.key === 'Escape') { // close dialog
            this.setState({
                popupVisible: false
            });
        }
    }
    //</editor-fold>

    //<editor-fold desc="Circles & commands">
    selectCircle(circleElement) {
        this.state.selectedCircleIndex = getCircleId(circleElement);
    }

    selectLastCircle() {
        this.setState({
            selectedCircleIndex: this.state.circles.length - 1
        });
    }

    executeCommand(command) {
        var position, circles;

        position = this.state.mousePosition;
        circles = CircleOps.executeCommand(command, this.state.circles, this.state.selectedCircleIndex, position);
        this.setState({circles});
    }
    //</editor-fold>

    //<editor-fold desc="React">
    render() {
        var self = this,
            index = 0,
            circles = this.state.circles.map(function (item) {
                var id = CIRCLE_ID_PREFIX + index,
                    circle = (
                        <Circle {...item}
                            id={id}
                            key={id}
                            strokeColor='white'
                            hovered={self.state.hoveredCircleIndex === index}
                            selected={self.state.selectedCircleIndex === index} />
                    );

                index++;
                return circle;
            }),
            popup = this.state.popupVisible && (
                <Popup />
            );

        return (
            <div ref='root'>
                <div ref='canvas' className='container'>
                    <Logo />
                    <Svg width='100%' height='100%'>
                        {circles}
                    </Svg>
                    <TextRotator />
                    {popup}
                </div>
                <BottomToolbar />
            </div>
        );
    }

    componentDidMount() {
        rootNode = ReactDOM.findDOMNode(this.refs.root);
        canvasNode = ReactDOM.findDOMNode(this.refs.canvas);
    }
    //</editor-fold>
}