"use strict";
import {SET_POPUP_INFO, UP_PROPERTY, DOWN_PROPERTY, LEFT_PROPERTY, RIGHT_PROPERTY} from '../actions/ActionPopup';

/**
 * Created by si.mun on 2017-03-31.
 */

const initialState = {
    total_item: 4,
    focused_Index: 0,
    selected_index: 0,
    btn_focus: "left",
};

export default function (state = initialState, action) {
    let total_item = state.total_item;
    let focused_Index = state.focused_Index;
    let btn_focus = state.btn_focus;
    let where = "";

    switch(action.type) {
        case SET_POPUP_INFO :
            return Object.assign({}, state, initialState);
        case UP_PROPERTY :
            if (focused_Index - 1 < 0 ) {
                focused_Index = 3;
            }
            else {
                focused_Index--;
            }
            return Object.assign({}, state, {focused_Index : focused_Index});
        case DOWN_PROPERTY :
            if (focused_Index + 1 >= total_item ) {
                focused_Index = 0;
            } else {
                focused_Index++;
            }
            return Object.assign({}, state, {focused_Index : focused_Index});
        case LEFT_PROPERTY :
            if (focused_Index === 3) {
                if ( btn_focus === "left" ) {
                    where = "right";
                }
                else {
                    where = "left";
                }
                return Object.assign({}, state, {btn_focus : where});
            }
        case RIGHT_PROPERTY :
            if (focused_Index === 3) {
                if ( btn_focus === "right" ) {
                    where = "left";
                }
                else {
                    where = "right";
                }
                return Object.assign({}, state, {btn_focus : where});
            }
        default :
            return state
    }
}