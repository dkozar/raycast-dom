import React, { Component } from 'react';
import WrappyText from 'react-wrappy-text';

const texts = [
    'This is the Raycast demo.',
    'Home of the circles.',
    'Click the circle to bring it to top.',
    'Click the background to create new circle.',
    'Shift + click = clear screen.',
    'Alt + click + mouse move = new circle.',
    '"Clear screen" button removes all the circles.',
    '"New circle" button creates the circle at last click position.'
];

export default class TextRotator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            text: texts[0]
        };

        this.start();
    }

    start() {
        this.interval = setInterval(
            () => {
                var index = (this.state.index + 1) % texts.length;

                this.setState({
                    index,
                    text: texts[index]
                });
            },
            5000
        );
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        return (
            <WrappyText className='wrappy'>{this.state.text}</WrappyText>
        );
    }
}