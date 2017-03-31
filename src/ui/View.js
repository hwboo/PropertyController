"use strict";
import React from "react";
import Container from "./Container";
import UIManager from '../manager/UIManager'

/**
 * @fileoverview
 * @author hw.boo on 2017-03-19.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class View extends Container {
    constructor(props) {
        super(props);
        this.type = Container.TYPE.VIEW;
        this.notifyFromPopup = this.notifyFromPopup.bind(this);
    }

    addPopup(class_info, data, index) {
        return UIManager.addPopup(class_info, this.props.layer_id, data, this.notifyFromPopup, index);
    }

    removePopup(popup_id) {
        UIManager.removePopup(this.props.layer_id, popup_id);
    }

    notifyFromPopup() {
    }
}

View.propTypes = {
    layer_id: React.PropTypes.string.isRequired,
    is_focus: React.PropTypes.bool.isRequired,
    callback: React.PropTypes.func.isRequired
};
export default View;