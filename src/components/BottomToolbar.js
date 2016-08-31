import React, { Component } from 'react';

export const NEW_BUTTON_ID = 'new-circle';
export const CLEAR_BUTTON_ID = 'clear';
export const OPEN_BUTTON_ID = 'open-popup';
export const STAR_BUTTON_ID = 'star';

export default class BottomToolbar extends Component {
    render() {

        return (
            <div className='toolbar toolbar-bottom'>
                <button id={CLEAR_BUTTON_ID} className='toolbar-button'><i className="fa fa-remove"></i>&nbsp;&nbsp;Clear</button>
                <button id={NEW_BUTTON_ID} className='toolbar-button'><i className="fa fa-plus-circle"></i>&nbsp;&nbsp;New circle</button>
                <button id={OPEN_BUTTON_ID} className='toolbar-button'><i className="fa fa-info-circle"></i>&nbsp;&nbsp;Open popup</button>
                <button id={STAR_BUTTON_ID} className='toolbar-button toolbar-button-right'><i className="fa fa-star"></i></button>
            </div>
        );
    }
}