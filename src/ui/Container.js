"use strict";
import React, {Component, PropTypes} from "react";
import Log from '../utils/Log';
import UIManager from "../manager/UIManager";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-02.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
const TYPE = {
    LAYER: "LAYER",
    VIEW: "VIEW",
    POPUP: "POPUP"
};
class Container extends Component {
    constructor(props) {
        super(props);
        this.type = "";
        this.log_tag = props.id;
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
    }

    componentWillMount() {
        UIManager.addKeyListener(this.props.id, this.handleKeyEvent);
    }

    componentWillUnmount() {
        UIManager.removeKeyListener(this.props.id, this.handleKeyEvent);
    }

    handleKeyEvent(event) {
        return false;
    }

    printLog(msg) {
        Log.printLog(this.props.id, msg);
    }

    static get TYPE() {
        return TYPE;
    }

    getType() {
        return this.type;
    }
}

Container.propTypes = {
    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.object
};
export default Container;