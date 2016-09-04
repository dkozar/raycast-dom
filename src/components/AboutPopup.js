import React, { Component } from 'react';
import WrappyText from 'react-wrappy-text';

export const ABOUT_POPUP_ID = 'about-popup';
export const CLOSE_BUTTON_ID = 'cancel';
export const GITHUB_BUTTON_ID = 'github';

export default class AboutPopup extends Component {

    render() {
        return (
            <div>
                <div className='popup-overlay'></div>
                <div className='flex-parent-centered'>
                    <div id={ABOUT_POPUP_ID} className='popup-dialog'>
                        <WrappyText className='popup-dialog-header'>About</WrappyText>
                        <div className='popup-dialog-content'>
                            <p>This demo was built using <a href='https://facebook.github.io/react/' target={'_blank'}>ReactJS</a> and <a href='https://github.com/dkozar/raycast-dom' target={'_blank'}>Raycast</a>.</p>
                            <p>It is a proof of concept that one could build relatively complex apps using Raycast, without using any of the "classic" React event handlers.</p>
                            <p className='popup-dialog-content-quote'>To see the code, please visit the project page on GitHub.</p>
                        </div>
                        <div className='popup-dialog-footer'>
                            <button className='toolbar-button' id={GITHUB_BUTTON_ID}><span className="fa fa-github-alt"></span>&nbsp;&nbsp;Go to GitHub</button>
                            <button className='toolbar-button' id={CLOSE_BUTTON_ID}><span className="fa fa-close"></span>&nbsp;&nbsp;Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}