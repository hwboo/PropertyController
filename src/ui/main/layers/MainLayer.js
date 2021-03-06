"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Layer from "../../Layer";
import KEY from "../../../common/KeyDef";
import DataManager from "../../../manager/DataManager";
import MenuListView from "../views/MenuListView";
import MenuDetailView from "../views/MenuDetailView";
import MenuSaveView from "../views/MenuSaveView";
import Main from "../../../Main";

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
        this.menu_detail_id = this.addView(MenuDetailView, DataManager.getDetailData(), false);
        this.menu_saved_id = this.addView(MenuSaveView, "", false);
    }

    render() {
        let style = {
            position : 'absolute',
            left : '0px',
            top : '20px',
            width: '1020px',
            height: '500px',
            fontSize : '35px',
            textAlign : 'center'
        }

        return (
            <div style={style}>
                <span>Property Controller</span>
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
                this.updateView(this.menu_detail_id, DataManager.getDetailData(data.category));
            }
        }
        else if (this.menu_detail_id === data.view_id) {
            if(MenuDetailView.TYPE.UNFOCUS === type) {
                this.setFocusView(this.menu_list_id, true);
                this.setFocusView(this.menu_detail_id, false);
            }
            else if (MenuDetailView.TYPE.CHANGE_PROPERTY === type) { // Property Popup으로부터 전달되어온 data
                DataManager.setDetailData({
                    focused_detail_view_Index : data.focused_detail_view_Index, // detail view에서 몇번째 property인지 알려줌
                    category: data.category,
                    changed_use: data.changed_use,
                    changed_value: data.changed_value,
                    changed_value_list: data.changed_value_list
                });

                this.updateView(data.view_id, DataManager.getDetailData(data.category));
            }
            else if (MenuDetailView.TYPE.UNFOCUS_TO_SAVE === type) {
                this.setFocusView(this.menu_detail_id, false);
                this.setFocusView(this.menu_saved_id, true);
            }
        }
        else if (this.menu_saved_id === data.view_id) {
            if (MenuSaveView.TYPE.SAVE === type) { // Property 최종 저장
                DataManager.setProperties();
                this.setFocusView(this.menu_detail_id, true);
                this.setFocusView(this.menu_saved_id, false);

            } else if (MenuSaveView.TYPE.UNFOCUS === type) { // Left 버튼
                this.setFocusView(this.menu_detail_id, true);
                this.setFocusView(this.menu_saved_id, false);

            } else if (MenuSaveView.TYPE.TERMINATE === type){ // 종료
                this.removeLayer(this.props.id);
                Main.exit(PC.Interface.RES_CODE.CANCEL, DataManager.getProperties());
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