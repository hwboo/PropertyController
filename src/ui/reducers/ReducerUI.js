"use strict";
import {
    ADD_LAYER,
    REMOVE_LAYER,
    ADD_VIEW,
    REMOVE_VIEW,
    SET_FOCUS_VIEW,
    UPDATE_VEW,
    ADD_POPUP,
    REMOVE_POPUP
} from '../actions/ActionUI';

/**
 * @fileoverview
 * @author hw.boo on 2017-03-10.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
function getIndex(id, arr) {
    let index = -1;
    for (let i in arr) {
        if (arr[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}

export default function (state = [], action) {
    let layer_index = -1;
    let popup_index = -1;
    switch (action.type) {
        case ADD_LAYER :
            return [...state, {
                id: action.payload.id,
                data: action.payload.data,
                views: {},
                popups: [],
                class_info: action.payload.class_info,
            }];
        case REMOVE_LAYER :
            layer_index = getIndex(action.payload.id, state);
            if (layer_index !== -1) {
                state.splice(layer_index, 1);
                return [...state];
            } else {
                return state;
            }
        case ADD_VIEW :
            layer_index = getIndex(action.payload.layer_id, state);
            if (layer_index !== -1) {
                state[layer_index].views[action.payload.view_id] = {
                    id: action.payload.view_id,
                    layer_id: action.payload.layer_id,
                    callback: action.payload.callback,
                    data: action.payload.data,
                    is_focus: action.payload.is_focus,
                    class_info: action.payload.class_info,
                };
                return [...state];
            } else {
                return state;
            }
        case REMOVE_VIEW:
            layer_index = getIndex(action.payload.layer_id, state);
            if (layer_index !== -1) {
                delete state[layer_index].views[action.payload.view_id];
                return [...state];
            } else {
                return state;
            }
        case SET_FOCUS_VIEW :
            layer_index = getIndex(action.payload.layer_id, state);
            if (layer_index !== -1) {
                state[layer_index].views[action.payload.view_id].is_focus = action.payload.is_focus;
                return [...state];
            } else {
                return state;
            }
        case UPDATE_VEW :
            layer_index = getIndex(action.payload.layer_id, state);
            if (layer_index !== -1) {
                state[layer_index].views[action.payload.view_id].data = action.payload.data;
                return [...state];
            } else {
                return state;
            }
        case ADD_POPUP :
            layer_index = getIndex(action.payload.layer_id, state);
            if (layer_index !== -1) {
                let temp = {
                    id: action.payload.popup_id,
                    layer_id: action.payload.layer_id,
                    data: action.payload.data,
                    callback: action.payload.callback,
                    class_info: action.payload.class_info,
                };
                if (action.payload.index >= 0) {
                    state[layer_index].popups.splice(action.payload.index, 0, temp);
                } else {
                    state[layer_index].popups.push(temp);
                }
                return [...state];
            } else {
                return state;
            }
        case REMOVE_POPUP :
            layer_index = getIndex(action.payload.layer_id, state);
            if (layer_index !== -1) {
                popup_index = getIndex(action.payload.popup_id, state[layer_index].popups);
                state[layer_index].popups.splice(popup_index, 1);
                return [...state];
            }
        default :
            return state;
    }
}

