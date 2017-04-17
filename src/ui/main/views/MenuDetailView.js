"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import KEY from "../../../common/KeyDef";
import View from '../../View';
import {setContents, upContent, downContent, setFocusContent, destroy} from "../../actions/ActionMenuDetail";
import Content from "../comps/Content";
import PropertyPopup from "../popup/PropertyPopup";
import ScrollBar from "../comps/ScrollBar";

const TYPE = {
    UNFOCUS: "UNFOCUS",
    CHANGE_PROPERTY: "CHANGE_PROPERTY",
    UNFOCUS_TO_SAVE: "UNFOCUS_TO_SAVE"
};

class MenuDetailView extends View {
    componentWillMount() {
        super.componentWillMount();
        this.props.setContents(Object.keys(this.props.data).length, 6);
        this.props.setFocusContent(this.is_focus);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.printLog("called shouldComponentUpdate() - nextProps.isfocus : " + nextProps.is_focus + ", this.props.is_focus : "+this.props.is_focus);
        this.printLog("called shouldComponentUpdate() - nextProps.data : " + nextProps.data + ", this.props.data : "+this.props.data);

        if(nextProps.is_focus !== this.props.is_focus) {
            this.props.setFocusContent(nextProps.is_focus);
        }
        // MenuDetailView로 focus가 변경되었을 때, MenuDetailView redux의 state를 변경해주어야 한다.
        if(nextProps.data !== this.props.data) {
            this.props.setContents(Object.keys(nextProps.data).length, this.props.properties_info.page_per_item);
        }

        return true;
    }

    componentWillUnmount () {
        this.props.destroy();
    }

    render() {
        let data = this.props.data;
        let prop_list_info = this.props.properties_info;
        let cur_page = prop_list_info.cur_page;
        let page_per_item = prop_list_info.page_per_item;
        let properties = [];
        let cur_item_idx = 0;
        let count = 0;

        for (let i in data) {
            if (cur_item_idx === page_per_item) {
                cur_item_idx = 0;
            }

            if ( count >= (cur_page - 1) * page_per_item && count < cur_page * page_per_item) {
                let focus = cur_item_idx === prop_list_info.focused_Index && this.props.is_focus

                properties.push(<Content key={data[i].PROPERTY} focus={focus} data={data[i]}/>);
            }

            cur_item_idx++;
            count++;
        }

        //Scroll Bar
        properties.push(<ScrollBar total_page={this.props.properties_info.total_page} cur_page={this.props.properties_info.cur_page}/>);

        let style = {
            position: 'absolute',
            background: 'rgb(240, 248, 255)',
            top: '86px',
            left: '208px',
            width: '600px',
            height: '430px',
        };

        return (
            <div style={style}>
                {properties}
            </div>
        );
    }

    notifyFromPopup(args) {

        if (args.type === "CHANGE_PROPERTY") {
            let focused_view_Index = this.props.properties_info.focused_Index;

            this.props.callback({
                type: args.type,
                view_id: this.props.id,
                focused_detail_view_Index : focused_view_Index,
                category: args.category,
                changed_use: args.changed_use,
                changed_value: args.changed_value,
                changed_value_list : args.changed_value_list
            });
        }
        this.removePopup(args.popup_id);
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        let data = this.props.data;
        let prop_list_info = this.props.properties_info;

        switch(key_code) {
            case KEY.UP :
                this.props.upContent();
                return true;
            case KEY.DOWN :
                this.props.downContent();
                return true;
            case KEY.LEFT :
                this.props.setFocusContent(false);
                this.props.callback({
                    type: TYPE.UNFOCUS,
                    view_id: this.props.id,
                    category: data[prop_list_info.focused_Index].CATEGORY
                });
                return true;
            case KEY.RIGHT :
                this.props.setFocusContent(false);
                this.props.callback({
                    type: TYPE.UNFOCUS_TO_SAVE,
                    view_id: this.props.id,
                });
                return true;
            case KEY.ENTER :
                let focused_index = prop_list_info.focused_Index;
                this.addPopup(PropertyPopup, data[focused_index], 0);
                return true;
        }
    }

    static get TYPE() {
        return TYPE;
    }
}

let mapStateToProps = (state) => {
    return {
        properties_info: state.ReducerMenuDetail
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setContents: (total_item, page_per_item) => dispatch(setContents(total_item, page_per_item)),
        setFocusContent: (is_focus) => dispatch(setFocusContent(is_focus)),
        upContent: () => dispatch(upContent()),
        downContent: () => dispatch(downContent()),
        destroy: () => dispatch(destroy())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetailView);