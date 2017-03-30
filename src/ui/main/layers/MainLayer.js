"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Layer from "../../Layer";
import KEY from "../../../common/KeyDef";
import DataManager from "../../../manager/DataManager";
import MenuListView from "../views/MenuListView";
import MenuDetailView from "../views/MenuDetailView";

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
        this.menu_detail_id = null;
    }

    componentWillMount() {
        super.componentWillMount();
        this.menu_list_id = this.addView(MenuListView, DataManager.getMenuData(), true);
        this.menu_detail_id = this.addView(MenuDetailView, DataManager.getDetailData(0), false);
    }

    render() {
        return (
            <div>
                <h1>MainLayer</h1>
            </div>
        );
    }

    notifyFromView(data) {
        let type = data.type;
        this.printLog("called notifyFromView() - view_id :" + data.view_id + ', type : ' + type);

        if (this.menu_list_id === data.view_id) {
            if(MenuListView.TYPE.UNFOCUS === type) {
                this.setFocusView(this.menu_list_id, false);
                this.setFocusView(this.menu_detail_id, true);
            } else if(MenuListView.TYPE.CHANGE_FOCUS === type) {
                this.updateView(this.menu_detail_id, DataManager.getDetailData(data.focused_Index));
            }
        }
        else if (this.menu_detail_id === data.view_id) {
            if(MenuDetailView.TYPE.UNFOCUS === type) {
                this.setFocusView(this.menu_list_id, true);
                this.setFocusView(this.menu_detail_id, false);
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