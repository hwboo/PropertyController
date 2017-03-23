"use strict";

export const ADD_LAYER = "ADD_LAYER";
export const REMOVE_LAYER = "REMOVE_LAYER";

export const ADD_VIEW = "ADD_VIEW";
export const REMOVE_VIEW = "REMOVE_VIEW";
export const SET_FOCUS_VIEW = "SET_FOCUS_VIEW";

export const ADD_POPUP = "PUSH_POPUP";
export const REMOVE_POPUP = "POP_POPUP";

export function addLayer(class_info, id, data) {
    return {
        type: ADD_LAYER,
        payload: {
            class_info: class_info,
            id: id,
            data: data,
        },
    }
}

export function removeLayer(id) {
    return {
        type: REMOVE_LAYER,
        payload: {
            id: id
        }
    }
}

export function addView(class_info, layer_id, view_id, data, callback, is_focus) {
    return {
        type: ADD_VIEW,
        payload: {
            class_info : class_info,
            layer_id: layer_id,
            view_id: view_id,
            data: data,
            callback: callback,
            is_focus: is_focus
        }
    }
}

export function removeView(layer_id, view_id) {
    return {
        type: REMOVE_VIEW,
        payload: {
            layer_id: layer_id,
            view_id: view_id
        }
    }
}

export function setFocusView(layer_id, view_id, is_focus) {
    return {
        type: SET_FOCUS_VIEW,
        payload: {
            layer_id: layer_id,
            view_id: view_id,
            is_focus: is_focus
        }
    }
}

export function addPopup(class_info, layer_id, popup_id, data, callback, index) {
    return {
        type: ADD_POPUP,
        payload: {
            class_info: class_info,
            layer_id: layer_id,
            popup_id: popup_id,
            data: data,
            callback: callback,
            index: index,
        },
    }
}

export function removePopup(layer_id, popup_id) {
    return {
        type: REMOVE_POPUP,
        payload: {
            layer_id: layer_id,
            popup_id: popup_id
        }
    }

}



