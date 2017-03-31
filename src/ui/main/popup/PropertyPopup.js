"use strict";
import React from "react";
import Popup from '../../Popup';
import KEY from "../../../common/KeyDef";
import {connect} from "react-redux";
import {upProperty, downProperty, leftProperty, rightProperty} from "../../actions/ActionPopup";

import css from "./css/popup.css";
import String from "../comps/String";
import Number from "../comps/Number";
import Boolean from "../comps/Boolean";

const TYPE = {
    SAVE: "SAVE",
    CANCEL: "CANCEL"
};

class PropertyPopup extends Popup {
    constructor(props) {
        super(props);
    }

    render() {
        let popup_style = {
            position: 'absolute',
            top: '50px',
            left: '250px',
            width: '500px',
            height: '300px',
            backgroundColor: 'darkgrey',
        }

        let prop_content = null;

        switch(this.props.data.TYPE) {
            case 'Number' :
                prop_content = <Number key={this.props.data.PROPERTY} data={this.props.data}/>;
                break;
            case 'String' :
                prop_content = <String key={this.props.data.PROPERTY} data={this.props.data}/>;
                break;
            case 'Boolean' :
                prop_content = <Boolean key={this.props.data.PROPERTY} data={this.props.data}/>;
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
                        <div className={css.left_btn}>
                            <span className={css.btn_txt}>저장</span>
                        </div>
                        <div className={css.right_btn}>
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
                if (key_code === 13) {// Enter
                    this.props.callback({
                        type: TYPE.SAVE,
                        popup_id: this.id
                    })
                }
                else if (key_code >= 48 && key_code <= 57) {//Number

                }
                return true;
            default :
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
        upProperty: () => dispatch(upProperty()),
        downProperty: () => dispatch(downProperty()),
        leftProperty: () => dispatch(leftProperty()),
        rightProperty: () => dispatch(rightProperty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPopup);