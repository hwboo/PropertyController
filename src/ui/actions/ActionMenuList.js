"use strict";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-13.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
export const UP_LIST = "UP_LIST";
export const DOWN_LIST = "DOWN_LIST";
export const SET_LIST_INFO = "SET_LIST";
export const SET_FOCUS = "SET_FOCUS";
export const DESTROY_MENU_LIST = "DESTROY_MENU_LIST";

export function setListInfo(total_item, page_per_item) {
    return {
        type: SET_LIST_INFO,
        payload: {
            total_item: total_item,
            page_per_item: page_per_item
        }
    }
}

export function upList() {
    return {
        type: UP_LIST
    }
}

export function downList() {
    return {
        type: DOWN_LIST
    }
}

export function setFocus(is_focus) {
    return {
        type: SET_FOCUS,
        payload: {
            is_focus: is_focus
        }
    }
}

export function destroy() {
    return {
        type: DESTROY_MENU_LIST
    }
}