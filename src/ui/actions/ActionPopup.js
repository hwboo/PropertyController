"use strict";

/**
 * Created by si.mun on 2017-03-31.
 */

export const SET_POPUP_INFO = "SET_POPUP_INFO";
export const SET_LIST_VALUES = "SET_LIST_VALUES";
export const UP_PROPERTY = "UP_PROPERTY";
export const UP_LIST_VALUE = "UP_LIST_VALUE";
export const DOWN_PROPERTY = "DOWN_PROPERTY";
export const DOWN_LIST_VALUE = "DOWN_LIST_VALUE";
export const LEFT_PROPERTY = "LEFT_PROPERTY";
export const RIGHT_PROPERTY = "RIGHT_PROPERTY";

export function setPopupInfo() {
    return {
        type: SET_POPUP_INFO
    }
}

export function setListValues(total_list_item, page_per_list_item) {
    return {
        type: SET_LIST_VALUES,
        payload: {
            total_list_item: total_list_item,
            page_per_list_item: page_per_list_item
        }
    }
}

export function upProperty() {
    return {
        type: UP_PROPERTY
    }
}

export function upListValue() {
    return {
        type: UP_LIST_VALUE
    }
}

export function downProperty() {
    return {
        type: DOWN_PROPERTY
    }
}

export function downListValue() {
    return {
        type: DOWN_LIST_VALUE
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