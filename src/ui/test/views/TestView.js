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
        this.printLog("called constructor()");
    }

    componentWillReceiveProps() {
        this.printLog("called componentWillReceiveProps() - this.props.is_focus : " + this.props.is_focus);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.printLog("called shouldComponentUpdate() - this.props.is_focus : " + this.props.is_focus);
        this.printLog("called shouldComponentUpdate() - nextProps : " + nextProps.is_focus);
        return true;
    }

    componentWillUpdate() {
        this.printLog("called componentWillUpdate() - this.props.is_focus : " + this.props.is_focus);
    }

    componentDidUpdate() {
        this.printLog("called componentDidUpdate() - this.props.is_focus : " + this.props.is_focus);
    }

    render() {
        this.printLog("called render()");
        return (
            <div>
                <h1>TestView - {this.props.id} / {this.props.layer_id}</h1>
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() key_code : " + event.keyCode);
        this.printLog("handleKeyEvent() is_focus : " + this.props.is_focus);
        return false;
    }
}
export default TestView;