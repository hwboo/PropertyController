"use strict";
import React from "react";
import Popup from '../../Popup';
import KEY from "../../../common/KeyDef";
import {connect} from "react-redux";
import {setPopupInfo, upProperty, downProperty, leftProperty, rightProperty} from "../../actions/ActionPopup";

import css from "./css/popup.css";
import String from "../comps/String";
import Number from "../comps/Number";
import Boolean from "../comps/Boolean";

const TYPE = {
    CHANGE_PROPERTY: "CHANGE_PROPERTY",
    CANCEL: "CANCEL"
};

let temp_changed_value = "";
let temp_changed_use = "";

class PropertyPopup extends Popup {

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            changed_value : "",
            changed_use : ""
        };
    }

    render() {
        let popup_style = {
            position: 'absolute',
            top: '50px',
            left: '170px',
            width: '500px',
            height: '300px',
            backgroundColor: 'darkgrey',
        }

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
            default :
                this.printLog('Unknown Type Property');
                break;
        }

        return (
            <div className={css.popup_container}>
                <div className={css.dimmed}></div>
                <div style={popup_style}>

                    {prop_content}

                    <div className={css.btn_box}>
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

        switch(key_code) {
            case KEY.UP :
                this.props.upProperty();
                return true;
            case KEY.DOWN :
                this.props.downProperty();
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

                } else if (focus === 2 && this.props.data.TYPE === "Boolean") { //Bolean Type의 value값 변경
                    if (temp_changed_value === "") {
                        temp_changed_value = this.props.data.VALUE? "FALSE" : "TRUE";
                    } else {
                        temp_changed_value = (temp_changed_value === "TRUE" ? "FALSE" : "TRUE");
                    }

                    this.setState({
                        changed_value : temp_changed_value
                    });

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
        upProperty: () => dispatch(upProperty()),
        downProperty: () => dispatch(downProperty()),
        leftProperty: () => dispatch(leftProperty()),
        rightProperty: () => dispatch(rightProperty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPopup);