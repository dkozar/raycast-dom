import React, { Component } from 'react';
import WrappyText from 'react-wrappy-text';

export const EXAMPLE_POPUP_ID = 'example-popup';
export const CLOSE_BUTTON_ID = 'cancel';

export default class ExamplePopup extends Component {

    render() {
        return (
            <div>
                <div className='popup-overlay'></div>
                <div className='flex-parent-centered'>
                    <div id={EXAMPLE_POPUP_ID} className='popup-dialog'>
                        <WrappyText className='popup-dialog-header'>Example popup</WrappyText>
                        <div className='popup-dialog-content'>
                            <p>This is the popup.</p>
                            <ul>
                                <li>Clicking outside this popup will close it.</li>
                                <li>Clicking inside will keep it open.</li>
                            </ul>
                            <p className='popup-dialog-content-quote'>[ with rays, it's easy to test an element against clicking outside ]</p>
                        </div>
                        <div className='popup-dialog-footer'>
                            <button className='toolbar-button' id={CLOSE_BUTTON_ID}><span className="fa fa-close"></span>&nbsp;&nbsp;Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}