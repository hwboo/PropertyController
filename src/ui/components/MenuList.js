"use strict";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Menu from "./Menu";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-02.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class MenuList extends Component {

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
}
let mapStateToProps = (state) => {
    return {
        list_info: state.ReducerMenuList
    };
};
export default connect(mapStateToProps)(MenuList);