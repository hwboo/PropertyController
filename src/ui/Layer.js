"use strict";
import React, {Component, PropTypes} from "react";
import Container from "./Container";
import UIManager from '../manager/UIManager'

/**
 * @fileoverview
 * @author hw.boo on 2017-03-14.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Layer extends Container {
    constructor(props) {
        super(props);
        this.type = Container.TYPE.LAYER;
        this.notifyFromPopup = this.notifyFromPopup.bind(this);
        this.notifyFromView = this.notifyFromView.bind(this);
    }

    addPopup(class_info, data, index) {
        return UIManager.addPopup(class_info, this.id, data, this.notifyFromPopup, index);
    }

    removePopup(popup_id) {
        UIManager.removePopup(this.id, popup_id);
    }

    addView(class_info, data, is_focus) {
        return UIManager.addView(class_info, this.id, data, this.notifyFromView, is_focus);
    }

    removeView(view_id) {
        return UIManager.addView(this.id, view_id);
    }

    setFocusView(view_id, is_focus) {
        UIManager.setFocusView(this.id, view_id, is_focus);
    }

    updateView(view_id, data) {
        UIManager.updateView(this.id, view_id, data);
    }

    notifyFromView() {
    }

    notifyFromPopup() {
    }
}
export default Layer;