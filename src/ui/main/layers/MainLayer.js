"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Layer from "../../Layer";
import KEY from "../../../common/KeyDef";
import DataManager from "../../../manager/DataManager";
import MenuListView from "../views/MenuListView";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-14.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class MainLayer extends Layer {
    constructor(props) {
        super(props);
        this.menu_list_id = null;
    }

    componentWillMount() {
        super.componentWillMount();
        this.menu_list_id = this.addView(MenuListView, DataManager.getMenuData(), true);
    }

    render() {
        return (
            <div>
                <h1>MainLayer</h1>
            </div>
        );
    }

    notifyFromView(data) {
        this.printLog("called notifyFromView() - data :" + data);
        if (this.menu_list_id === data.view_id) {
            let type = data.type;
            this.printLog("notifyFromView() - type :" + type);
            if(MenuListView.TYPE.UNFOCUS === type) {
                this.setFocusView(data.view_id, false);
            } else if(MenuListView.TYPE.CHANGE_FOCUS === type) {
                this.updateView();
            }
        }
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        if (key_code === KEY.RIGHT) {
        }
        return false;
    }
}
export default connect()(MainLayer);