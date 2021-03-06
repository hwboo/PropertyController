"use strict";

export const SET_INIT = "SET_INIT";
export const CHANGE_BUTTON = "CHANGE_BUTTON";
export const SET_SAVE_FOCUS = "SET_SAVE_FOCUS";
export const DESTROY_SAVE_VIEW = "DESTROY_SAVE_VIEW";

export function setInit() {
    return {
        type: SET_INIT
    }
}

export function changeButton () {
    return {
        type: CHANGE_BUTTON
    }
}

export function setSaveFocus (is_focus) {
    return {
        type: SET_SAVE_FOCUS,
        payload: {
            is_focus : is_focus
        }

    }
}

export function destroy() {
    return {
        type: DESTROY_SAVE_VIEW
    }
}