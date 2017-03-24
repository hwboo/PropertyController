"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Key from "../../../common/KeyDef";
import View from '../../View';
import {setListInfo, setFocus, upList, downList} from "../../actions/ActionMenuList";
import Menu from "../comps/Menu";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-20.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
const TYPE = {
    UNFOCUS: "UNFOCUS",
    CHANGE_FOCUS: "CHANGE_FOCUS"
};
class MenuListView extends View {
    componentWillMount() {
        super.componentWillMount();
        this.props.setListInfo(Object.keys(this.props.data).length, 5);
        this.props.setFocus(this.is_focus);
    }

    render() {
        let data = this.props.data;
        let list_info = this.props.list_info;
        let menus = [];
        let conut = 0;
        for (let i in data) {
            let focus = conut === list_info.focused_Index && list_info.is_focus;
            let select = conut === list_info.selected_index;
            menus.push(<Menu key={i} name={i} focus={focus} select={select}/>);
            conut++;
        }
        let style = {
            background: 'green',
            width: '200px',
            height: '400px'
        };
        return (
            <div style={style}>
                {menus}
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        if (key_code === Key.UP) {
            this.props.upList();
            this.callback({
                type: TYPE.CHANGE_FOCUS,
                view_id: this.id,
                focused_Index: this.props.list_info.focused_Index
            });
            return true;
        } else if (key_code === Key.DOWN) {
            this.props.downList();
            this.callback({
                type: TYPE.CHANGE_FOCUS,
                view_id: this.id,
                focused_Index: this.props.list_info.focused_Index
            });
            return true;
        } else if (key_code === Key.RIGHT) {
            this.props.setFocus(false);
            this.callback({
                type: TYPE.UNFOCUS,
                view_id: this.id
            });
            return true;
        }
    }

    static get TYPE() {
        return TYPE;
    }
}

let mapStateToProps = (state) => {
    return {
        list_info: state.ReducerMenuList
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setListInfo: (total_item, page_per_item) => dispatch(setListInfo(total_item, page_per_item)),
        setFocus: (is_focus) => dispatch(setFocus(is_focus)),
        upList: () => dispatch(upList()),
        downList: () => dispatch(downList()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuListView);