import React, { Component } from 'react';
import WrappyText from 'react-wrappy-text';

export const POPUP_ID = 'popup';
export const CLOSE_BUTTON_ID = 'cancel';
export const SUBMIT_BUTTON_ID = 'submit';


export default class Popup extends Component {

    render() {
        return (
            <div className='flex-parent-centered'>
                <div id={POPUP_ID} className='popup-dialog'>
                    <WrappyText className='popup-dialog-header'>This is the popup</WrappyText>
                    <div className='popup-dialog-content'>
                        <p>Clicking outside this popup will close it.</p>
                        <p>Clicking inside will keep it open.</p><br/>
                        <p>With rays, it's easy to test an element against clicking outside.</p><br/>
                        <p className='popup-dialog-content-last'>To see the code, visit the project page on GitHub.</p><br/>
                    </div>
                    <div className='popup-dialog-footer'>
                        <button className='toolbar-button' id={SUBMIT_BUTTON_ID}><span className="fa fa-github-alt"></span>&nbsp;&nbsp;Go to GitHub</button>
                        <button className='toolbar-button' id={CLOSE_BUTTON_ID}><span className="fa fa-close"></span>&nbsp;&nbsp;Close</button>
                    </div>
                </div>
            </div>
        );
    }
}