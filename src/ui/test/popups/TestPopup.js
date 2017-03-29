"use strict";
import React, {Component, PropTypes} from "react";
import Popup from '../../Popup';
import KEY from '../../../common/KeyDef';

/**
 * @fileoverview
 * @author hw.boo on 2017-03-15.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class TestPopup extends Popup {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>TestPopup - {this.props.id} / {this.props.layer_id}</h1>
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        if (key_code === KEY.UP) {
            this.props.callback();
            return true;
        }
        return false;
    }
}

export default TestPopup;