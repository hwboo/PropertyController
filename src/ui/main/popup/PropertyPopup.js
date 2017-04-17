"use strict";
import React from "react";
import Popup from '../../Popup';
import KEY from "../../../common/KeyDef";
import {connect} from "react-redux";
import {setPopupInfo, setListValues, upProperty, upListValue, downProperty, downListValue, leftProperty, rightProperty, destroy} from "../../actions/ActionPopup";

import css from "./css/popup.css";
import String from "../comps/String";
import Number from "../comps/Number";
import Boolean from "../comps/Boolean";
import ListComp from "../comps/ListComp";

const TYPE = {
    CHANGE_PROPERTY: "CHANGE_PROPERTY",
    CANCEL: "CANCEL"
};

let temp_changed_value = "";
let temp_changed_use = "";
let temp_changed_value_list = [];

class PropertyPopup extends Popup {
    constructor(props) {
        super(props);

        this.state = {
            changed_value : "",
            changed_use : "",
            changed_value_list : props.data.VALUE_LIST,
            is_value_entered : false,
            is_popup_destroyed : false,
        };

        if (props.data.TYPE === "List") {
            temp_changed_value_list = props.data.VALUE_LIST.slice();
        }

        this.props.setPopupInfo();
    }

    componentWillMount() {
        super.componentWillMount();

        if (this.props.data.TYPE === "List") {
            this.props.setListValues(this.props.data.VALUE_LIST.length, 3);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.printLog("called shouldComponentUpdate() - nextState.changed_value : " + nextState.changed_value + ", this.state.changed_value : " + this.state.changed_value);
        if (this.props.data.TYPE === "List") {
            if (nextState.changed_value !== this.state.changed_value) {
                this.props.setListValues(this.props.data.VALUE_LIST.length, 3);
            }
        }
        return true;
    }

    render() {
        let prop_content = null;
        let focus = this.props.focus_info.focused_Index;
        let save_btn_focus = this.props.focus_info.btn_focus; // toggle_btn 사용은 나중에 생각해보자. 지금은 Enter 때마다 toggle 되도록 구현됨
        let origin_use = this.props.data.USE? true : false;
        let origin_value = this.props.data.VALUE;

        switch(this.props.data.TYPE) {
            case 'Number' :
                prop_content = <Number key={this.props.data.PROPERTY}
                                       property={this.props.data.PROPERTY}
                                       focus={focus}
                                       des={this.props.data.DES}
                                       use={this.state.changed_use === "" ? origin_use : this.state.changed_use}
                                       value={this.state.changed_value === "" ? origin_value : this.state.changed_value}/>;
                break;
            case 'String' :
                prop_content = <String key={this.props.data.PROPERTY}
                                       property={this.props.data.PROPERTY}
                                       focus={focus}
                                       des={this.props.data.DES}
                                       use={this.state.changed_use === "" ? origin_use : this.state.changed_use}
                                       value={this.state.changed_value === "" ? origin_value : this.state.changed_value}/>;
                break;
            case 'Boolean' :
                prop_content = <Boolean key={this.props.data.PROPERTY}
                                        property={this.props.data.PROPERTY}
                                        focus={focus}
                                        des={this.props.data.DES}
                                        use={this.state.changed_use === "" ? origin_use : this.state.changed_use}
                                        value={this.state.changed_value === "" ? (origin_value? "TRUE" : "FALSE") : this.state.changed_value}/>;
                break;
            case 'List' :
                let value_list_data = [];
                let state_value_list = this.state.changed_value_list;

                if (this.state.is_value_entered) {
                    let value_list_info = this.props.focus_info;
                    let cur_list_page = value_list_info.cur_list_page;
                    let page_per_list_item = value_list_info.page_per_list_item;
                    let count = 0;

                    for(let data of state_value_list) {
                        if ( count >= (cur_list_page - 1) * page_per_list_item && count < cur_list_page * page_per_list_item) {
                            value_list_data.push(data);
                        }
                        count++;
                    }
                }

                prop_content = <ListComp key={this.props.data.PROPERTY}
                                       property={this.props.data.PROPERTY}
                                       focus={focus}
                                       des={this.props.data.DES}
                                       use={this.state.changed_use === "" ? origin_use : this.state.changed_use}
                                       value={this.state.changed_value === "" ? origin_value : this.state.changed_value}
                                       value_list={value_list_data}
                                       is_value_entered={this.state.is_value_entered}
                                       total_page={this.props.focus_info.total_list_page}
                                       cur_page={this.props.focus_info.cur_list_page}
                                       list_focus={this.props.focus_info.focused_list_Index}
                                       height={120}
                                       left={490}
                                       top={11}/>;

                break;
            default :
                this.printLog('Unknown Type Property');
                break;
        }

        return (
            <div className={css.popup_container}>
                <div className={css.dimmed}></div>
                <div className={css.popup_area} style={{top : this.state.is_value_entered? 15 + 'px' : 50 + 'px'}}>

                    {prop_content}

                    <div className={css.btn_box} style={{top : this.state.is_value_entered? 300 + 'px' : 230 + 'px'}}>
                        {/*
                            focus === 3           : focus가 btn에 위치해 있을 때
                            btn_focus === "left"  : btn이 left일 때
                            위의 2가지 조건이 만족되어야 btn에 focus가 이동된 것으로 간주

                        */}
                        <div className={css.left_btn}
                             style={{opacity: focus === 3 && save_btn_focus === "left" ? 1 : 0.5}}>
                            <span className={css.btn_txt}>저장</span>
                        </div>
                        <div className={css.right_btn}
                             style={{opacity: focus === 3 && save_btn_focus === "right" ? 1 : 0.5}}>
                            <span className={css.btn_txt}>취소</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        let focus = this.props.focus_info.focused_Index;
        let is_value_entered = this.state.is_value_entered;
        let cur_list_page = this.props.focus_info.cur_list_page;
        let cur_list_focused_Index = this.props.focus_info.focused_list_Index;

        switch(key_code) {
            case KEY.UP :
                if (is_value_entered) {
                    this.props.upListValue();
                } else {
                    this.props.upProperty();
                }
                return true;
            case KEY.DOWN :
                if (is_value_entered) {
                    this.props.downListValue();
                } else {
                    this.props.downProperty();
                }
                return true;
            case KEY.LEFT :
                this.props.leftProperty();
                return true;
            case KEY.RIGHT :
                this.props.rightProperty();
                return true;
            case KEY.ENTER :
                let btn_focus = this.props.focus_info.btn_focus;

                if (focus === 1) { // USE 값 변경
                    if (temp_changed_use === "") {
                        temp_changed_use = this.props.data.USE? false : true;
                    } else {
                        temp_changed_use = (!temp_changed_use);
                    }

                    this.setState({
                        changed_use : temp_changed_use
                    });

                } else if (focus === 2) { //Boolean, List Type의 value값 변경
                    if (this.props.data.TYPE === "Boolean") {
                        if (temp_changed_value === "") {
                            temp_changed_value = this.props.data.VALUE? "FALSE" : "TRUE";
                        } else {
                            temp_changed_value = (temp_changed_value === "TRUE" ? "FALSE" : "TRUE");
                        }

                        this.setState({
                            changed_value : temp_changed_value
                        });
                    } else if (this.props.data.TYPE === "List") {
                        if (!this.state.is_value_entered) { //is_value_entered === false이면 value만 보여주는 상태이다.
                            is_value_entered = true; // is_value_entered를 true로 바꿔서 <ListComp>에서 VALUE_LIST를 보여주도록 하자.

                            this.setState({
                                is_value_entered : is_value_entered,
                            })
                        } else { // VALUE_LIST를 보여주다가 Enter를 눌렀기 때문에 Property값 세팅도 동시에 해주어야 한다.
                            is_value_entered = false;

                            /*
                             * VALUE_LIST에서 선택된 값을 VALUE에 보여주고, VALUE에 있던 값을 VALUE_LIST에 삽입하는 과정
                             */

                            // VALUE_LIST에서 선택된 값을 VALUE에 대입
                            temp_changed_value = this.state.changed_value_list[(--cur_list_page * 3) + cur_list_focused_Index];

                            temp_changed_value_list.push(this.state.changed_value === "" ? this.props.data.VALUE : this.state.changed_value);
                            let value_idx = temp_changed_value_list.indexOf(temp_changed_value);
                            temp_changed_value_list.splice(value_idx, 1);

                            this.setState({
                                is_value_entered : is_value_entered,
                                changed_value : temp_changed_value,
                                changed_value_list : temp_changed_value_list
                            })
                        }
                    }
                } else if (focus === 3) {
                    let args = {};

                    // temp_changed_use 랑 temp_changed_value 중에 하나만 고쳤을 때, 빈 값 혹은 undefined가 들어가는 것을 방지
                    if (temp_changed_use === "") {
                        temp_changed_use = this.props.data.USE;
                    }
                    if (temp_changed_value === "") {
                        temp_changed_value = this.props.data.VALUE;
                    }

                    if (this.props.data.TYPE === "Boolean") {
                        temp_changed_value = temp_changed_value === "TRUE" ? true : false;
                    }

                    if (btn_focus === "left") { // 저장버튼

                        args = {
                            type: TYPE.CHANGE_PROPERTY,
                            id: this.id,
                            category: this.props.data.CATEGORY,
                            changed_use: temp_changed_use,
                            changed_value: temp_changed_value,
                            changed_value_list : temp_changed_value_list
                        }
                    }
                    else { // 취소버튼
                        args = {
                            type: TYPE.CANCEL,
                            id: this.id
                        }
                    }

                    temp_changed_use = "";
                    temp_changed_value = "";

                    this.props.callback(args);
                    this.props.setPopupInfo();

                    // componnentWillUnmount에 destory를 넣었을 시에,
                    // Enter Event보다 ComponentWillUnmount가 먼저 실행되기 때문에 resource 해제가 이뤄지지 않음.
                    // 때문에 View와는 다르게 저장, 취소버튼을 눌렀을 시에 destroy가 되게끔 구현함
                    this.props.destroy();
                }
                return true;
            default :
                if (focus === 2) { // Popup에서 VALUE에 focus가 위치해 있을 때
                    if (key_code >= 48 && key_code <= 57) {//Number
                        temp_changed_value += (key_code - 48) + "";
                    } else if (key_code === 8) { // BackSpace
                        temp_changed_value = temp_changed_value.slice(0, temp_changed_value.length -1);
                    } else { //String

                    }

                    this.setState({
                        changed_value : temp_changed_value
                    });
                }
                return true;
        }
        return false;
    }
}

let mapStateToProps = (state) => {
    return {
        focus_info: state.ReducerPopup
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setPopupInfo: () => dispatch(setPopupInfo()),
        setListValues: (total_list_item, page_per_list_item) => dispatch(setListValues(total_list_item, page_per_list_item)),
        upProperty: () => dispatch(upProperty()),
        upListValue: () => dispatch(upListValue()),
        downProperty: () => dispatch(downProperty()),
        downListValue: () => dispatch(downListValue()),
        leftProperty: () => dispatch(leftProperty()),
        rightProperty: () => dispatch(rightProperty()),
        destroy: () => dispatch(destroy())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPopup);