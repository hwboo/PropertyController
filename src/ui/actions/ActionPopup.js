"use strict";

/**
 * Created by si.mun on 2017-03-31.
 */

export const SET_POPUP_INFO = "SET_POPUP_INFO";
export const UP_PROPERTY = "UP_PROPERTY";
export const DOWN_PROPERTY = "DOWN_PROPERTY";
export const LEFT_PROPERTY = "LEFT_PROPERTY";
export const RIGHT_PROPERTY = "RIGHT_PROPERTY";

export function setPopupInfo() {
    return {
        type: SET_POPUP_INFO
    }
}

export function upProperty() {
    return {
        type: UP_PROPERTY
    }
}

export function downProperty() {
    return {
        type: DOWN_PROPERTY
    }
}

export function leftProperty() {
    return {
        type: LEFT_PROPERTY
    }
}

export function rightProperty() {
    return {
        type: RIGHT_PROPERTY
    }
}