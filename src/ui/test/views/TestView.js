"use strict";
import React, {Component, PropTypes} from "react";
import View from '../../View';
/**
 * @fileoverview
 * @author hw.boo on 2017-03-20.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class TestView extends View {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>TestView - {this.id} / {this.layer_id}</h1>
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() key_code : " + event.keyCode);
        return false;
    }
}
export default TestView;