"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import KEY from "../../../common/KeyDef";
import View from '../../View';
import {setListInfo, setFocus, upList, downList, destroy} from "../../actions/ActionMenuList";
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
        this.printLog("called componentWillMount()");
        this.props.setListInfo(Object.keys(this.props.data).length, 6);
        this.props.setFocus(this.props.is_focus);
    }

    componentWillReceiveProps() {
        this.printLog("called componentWillReceiveProps()");
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.printLog("called shouldComponentUpdate() - nextProps.isfocus : " + nextProps.is_focus + ", this.props.is_focus : "+this.props.is_focus);
        this.printLog("called shouldComponentUpdate() - nextProps.data : " + nextProps.data + ", this.props.data : "+this.props.data);

        if(nextProps.is_focus !== this.props.is_focus) {
            this.props.setFocus(nextProps.is_focus);
        }
        return true;
    }

    componentWillUnmount () {
        this.props.destroy();
    }


    render() {
        this.printLog("called render()");
        let data = this.props.data;
        let list_info = this.props.list_info;
        let page_per_item = list_info.page_per_item;
        let cur_page = list_info.cur_page;
        let menus = [];
        let cur_item_idx = 0;
        let count = 0;

        for (let i in data) {
            if (cur_item_idx === page_per_item) {
                cur_item_idx = 0;
            }

            if ( count >= (cur_page - 1) * page_per_item && count < cur_page * page_per_item) {
                let focus = cur_item_idx === list_info.focused_Index && this.props.is_focus;
                let select = cur_item_idx === list_info.selected_index && (!this.props.is_focus);

                menus.push(<Menu key={i} name={i} focus={focus} select={select}/>);
            }

            cur_item_idx++;
            count++;
        }

        let style = {
            position: 'absolute',
            top : '86px',
            background: 'rgb(245, 245, 245)',
            width: '200px',
            height: '430px',
            borderRadius : '5px'
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
        let count = 0;
        let focused_Index;
        let cur_category;
        let type;

        switch(key_code) {
            case KEY.UP :
                this.props.upList();
                type = TYPE.CHANGE_FOCUS;
                break;
            case KEY.DOWN :
                this.props.downList();
                type = TYPE.CHANGE_FOCUS;
                break;
            case KEY.RIGHT :
                this.props.setFocus(false);
                type = TYPE.UNFOCUS;
                break;
        }

        focused_Index = this.props.list_info.focused_Index;

        for(let key in this.props.data) {
            if (count === focused_Index) {
                cur_category = key;
                break;
            }
            count++;
        }

        this.props.callback({
            type: type,
            view_id: this.props.id,
            category: cur_category
        });

        return true;
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
        destroy: () => dispatch(destroy())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuListView);