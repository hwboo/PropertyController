"use strict";
import {SET_INIT, CHANGE_BUTTON, SET_SAVE_FOCUS} from '../actions/ActionMenuSave';

const initialState = {
    focused_Index: 0,
    is_focus: false
};

export default function (state = initialState, action) {
    let focused_Index = state.focused_Index;

    switch(action.type) {
        case SET_INIT :
            return Object.assign({}, state, initialState);
        case CHANGE_BUTTON :
            if (focused_Index === 0) {
                focused_Index = 1;
            } else {
                focused_Index = 0;
            }
            return Object.assign({}, state, {
                focused_Index : focused_Index
            });
        case SET_SAVE_FOCUS :
            return Object.assign({}, state, {
                is_focus : action.payload.is_focus
            });
        default :
            return state;
    }

}