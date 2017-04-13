"use strict";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import KEY from "../../../common/KeyDef";
import View from '../../View';
import {setInit, changeButton, setSaveFocus} from "../../actions/ActionMenuSave";
import Button from "../comps/Button";

const TYPE = {
    UNFOCUS: "UNFOCUS",
    SAVE: "SAVE",
    TERMINATE: "TERMINATE"
};
class MenuSaveView extends View {
    componentWillMount() {
        super.componentWillMount();
        this.props.setInit();
        this.props.setSaveFocus(this.is_focus);
    }

    render() {
        let style = {
            position: 'absolute',
            background: 'aqua',
            top: '86px',
            left: '807px',
            width: '200px',
            height: '400px',
        };

        let btn_style = {
            position: 'relative',
            top: '255px',
            left: '0px',
            width: '200px',
            height: '50px',
            marginTop: '10px'
        }

        return (
            <div style={style}>
                <div style={btn_style}>
                    <Button focus={this.props.is_focus ? (this.props.saved_info.focused_Index === 0 ? true : false) : false} text={"저장"}/>
                </div>

                <div style={btn_style}>
                    <Button focus={this.props.is_focus ? (this.props.saved_info.focused_Index === 1 ? true : false) : false} text={"종료"}/>
                </div>
            </div>
        );
    }

    handleKeyEvent(event) {
        this.printLog("called handleKeyEvent() - " + event.keyCode);
        let key_code = event.keyCode;
        let focused_Index = this.props.saved_info.focused_Index;

        switch(key_code) {
            case KEY.UP :
            case KEY.DOWN :
                this.props.changeButton();
                break;
            case KEY.LEFT :
                this.props.setSaveFocus(false);
                this.props.setInit();

                this.props.callback({
                    type: TYPE.UNFOCUS,
                    view_id: this.props.id
                });
                break;
            case KEY.ENTER :
                if (focused_Index === 0) { // 저장
                    this.props.callback({
                        type: TYPE.SAVE,
                        view_id: this.props.id
                    });
                } else { // 종료
                    this.props.callback({
                        type: TYPE.TERMINATE,
                        view_id: this.props.id
                    });
                }
                // 저장... redux 어떻게???
                break;
        }
    }

    static get TYPE() {
        return TYPE;
    }
}

let mapStateToProps = (state) => {
    return {
        saved_info: state.ReducerMenuSave
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setInit: () => dispatch(setInit()),
        changeButton: () => dispatch(changeButton()),
        setSaveFocus: (is_focus) => dispatch(setSaveFocus(is_focus))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSaveView);