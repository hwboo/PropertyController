"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import KEY from "../../../common/KeyDef";
import View from '../../View';
import {setProperties, upProperty, downProperty, setFocusProperty} from "../../actions/ActionMenuDetail";
import BooleanProp  from "../comps/BooleanProp";
import NumberProp from "../comps/NumberProp";
import StringProp from "../comps/StringProp";

const TYPE = {
    UNFOCUS: "UNFOCUS"
};

class MenuDetailView extends View {
    componentWillMount() {
        super.componentWillMount();
        this.props.setProperties(Object.keys(this.props.data).length, 5);
        this.props.setFocusProperty(this.is_focus);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.printLog("called shouldComponentUpdate() - nextProps.isfocus : " + nextProps.is_focus + ", this.props.is_focus : "+this.props.is_focus);
        this.printLog("called shouldComponentUpdate() - nextProps.data : " + nextProps.data + ", this.props.data : "+this.props.data);

        if(nextProps.is_focus !== this.props.is_focus) {
            this.props.setFocusProperty(nextProps.is_focus);
        }
        // MenuDetailView로 focus가 변경되었을 때, MenuDetailView redux의 state를 변경해주어야 한다.
        if(nextProps.data !== this.props.data) {
            this.props.setProperties(Object.keys(nextProps.data).length, 5);
        }

        return true;
    }

    render() {
        let data = this.props.data;
        let prop_list_info = this.props.properties_info;
        let properties = [];
        let count = 0;

        for (let i in data) {
            let focus = count === prop_list_info.focused_Index && this.props.is_focus;
            let select = count === prop_list_info.selected_index && this.props.is_focus;

            if (data[i].TYPE === 'Boolean') {
                properties.push(<BooleanProp key={data[i].PROPERTY} focus={focus} select={select} data={data[i]}/>);
            } else if (data[i].TYPE === 'Number') {
                properties.push(<NumberProp key={data[i].PROPERTY} focus={focus} select={select} data={data[i]}/>);
            } else if (data[i].TYPE === 'String'){
                properties.push(<StringProp key={data[i].PROPERTY} focus={focus} select={select} data={data[i]}/>);
            }
            count++;
        }

        let style = {
            position: 'absolute',
            background: 'yellow',
            top: '86px',
            left: '210px',
            width: '600px',
            height: '400px',
        };

        return (
            <div style={style}>
                {properties}
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;

        switch(key_code) {
            case KEY.UP :
                this.props.upProperty();
                return true;
            case KEY.DOWN :
                this.props.downProperty();
                return true;
            case KEY.LEFT :
                this.props.setFocusProperty(false);
                this.props.callback({
                    type: TYPE.UNFOCUS,
                    view_id: this.props.id,
                    focused_Index: this.props.properties_info.focused_Index
                });
                return true;
            default :
                let key = key_code - 48;
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
        setProperties: (total_item, page_per_item) => dispatch(setProperties(total_item, page_per_item)),
        setFocusProperty: (is_focus) => dispatch(setFocusProperty(is_focus)),
        upProperty: () => dispatch(upProperty()),
        downProperty: () => dispatch(downProperty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetailView);

// if (data[i].type === 'Boolean') {
//     properties.push(<myBoolean key={data[i].PROPERTY}
//                                category={data[i].CATEGORY}
//                                des={data[i].DES}
//                                propName={data[i].PROPERTY}
//                                type={data[i].TYPE}
//                                use={data[i].USE}
//                                value={data[i].VALUE}/>);
// } else if (data[i].type === 'Number') {
//     properties.push(<myNumber key={data[i].PROPERTY}
//                               category={data[i].CATEGORY}
//                               des={data[i].DES}
//                               propName={data[i].PROPERTY}
//                               type={data[i].TYPE}
//                               use={data[i].USE}
//                               value={data[i].VALUE}/>);
// } else if (data[i].type === 'String'){
//     properties.push(<myString key={data[i].PROPERTY}
//                               category={data[i].CATEGORY}
//                               des={data[i].DES}
//                               propName={data[i].PROPERTY}
//                               type={data[i].TYPE}
//                               use={data[i].USE}
//                               value={data[i].VALUE}/>);
// }