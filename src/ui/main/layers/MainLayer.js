"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Layer from "../../Layer";
import Key from "../../../common/KeyDef";
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
        if (this.menu_list_id === data.id) {
            this.setFocusView(data.id, false);
        }
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        if (key_code === Key.RIGHT) {
        }
        return false;
    }
}
export default connect()(MainLayer);