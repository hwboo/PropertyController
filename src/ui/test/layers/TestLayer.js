"use strict";
import React, {PropTypes} from "react";
import Layer from '../../Layer';
import Key from '../../../common/KeyDef';
import TestPopup from '../popups/TestPopup'
import TestView from '../views/TestView';

/**
 * @fileoverview
 * @author hw.boo on 2017-03-20.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class TestLayer extends Layer {
    constructor(props) {
        super(props);
        this.view_id = "";
    }

    componentWillMount() {
        super.componentWillMount();
        this.view_id = this.addView(TestView);
        this.addPopup(TestPopup);
        this.addPopup(TestPopup);
        this.addPopup(TestPopup);

    }

    render() {
        return (
            <div>
                TestLayer
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() key_code : " + event.keyCode);
        let key_code = event.keyCode;
        if (key_code === Key.UP) {
        } else if (key_code === Key.DOWN) {
            // this.props.downList();
        } else if (key_code === Key.RIGHT) {
            // this.props.unfocusList();
            this.setFocusView(this.view_id, true);
        }
        return false;
    }
}
export default TestLayer;