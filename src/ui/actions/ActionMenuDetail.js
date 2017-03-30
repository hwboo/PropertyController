"use strict";

/**
 * @fileoverview
 * @author si.mun on 2017-03-27.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
export const UP_PROPERTY = "UP_PROPERTY";
export const DOWN_PROPERTY = "DOWN_PROPERTY";
export const SET_PROPERTIES = "SET_PROPERTIES";
export const SET_FOCUS_PROPERTY = "SET_FOCUS_PROPERTY";

export function setProperties(total_item, page_per_item) {
    return {
        type: SET_PROPERTIES,
        payload: {
            total_item: total_item,
            page_per_item: page_per_item
        }
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

export function setFocusProperty(is_focus) {
    return {
        type: SET_FOCUS_PROPERTY,
        payload: {
            is_focus: is_focus
        }
    }
}