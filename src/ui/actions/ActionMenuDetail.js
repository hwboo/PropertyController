"use strict";

/**
 * @fileoverview
 * @author si.mun on 2017-03-27.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
export const UP_CONTENT = "UP_CONTENT";
export const DOWN_CONTENT = "DOWN_CONTENT";
export const SET_CONTENTS = "SET_CONTENTS";
export const SET_FOCUS_CONTENT = "SET_FOCUS_CONTENT";
export const DESTORY_DETAIL_VIEW = "DESTORY_DETAIL_VIEW";

export function setContents(total_item, page_per_item) {
    return {
        type: SET_CONTENTS,
        payload: {
            total_item: total_item,
            page_per_item: page_per_item
        }
    }
}

export function upContent() {
    return {
        type: UP_CONTENT
    }
}

export function downContent() {
    return {
        type: DOWN_CONTENT
    }
}

export function setFocusContent(is_focus) {
    return {
        type: SET_FOCUS_CONTENT,
        payload: {
            is_focus: is_focus
        }
    }
}

export function destroy() {
    return {
        type: DESTORY_DETAIL_VIEW
    }
}