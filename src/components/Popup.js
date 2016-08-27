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
                    <WrappyText className='popup-dialog-header'>Popup dialog here</WrappyText>
                    <div className='popup-dialog-content'>
                        <p>Hello, user.</p><br/>
                        <p>Clicking outside this of popup will close it.</p>
                        <p>It's easy to test a ray against element's "outside".</p><br/>
                        <p className='popup-dialog-content-last'>You could visit the GitHub page by clicking the button below.</p><br/>
                    </div>
                    <div className='popup-dialog-footer'>
                        <button className='toolbar-button' id={SUBMIT_BUTTON_ID}><span className="fa fa-github-alt"></span>&nbsp;Go to GitHub</button>
                        <button className='toolbar-button' id={CLOSE_BUTTON_ID}><span className="fa fa-close"></span>&nbsp;Close</button>
                    </div>
                </div>
            </div>
        );
    }
}