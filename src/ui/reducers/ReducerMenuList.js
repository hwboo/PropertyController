"use strict";
import {SET_LIST_INFO, UP_LIST, DOWN_LIST, SET_FOCUS, DESTROY_MENU_LIST} from '../actions/ActionMenuList';

/**
 * @fileoverview
 * @author hw.boo on 2017-03-13.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */

function calTotalPage(total_item, page_per_item) {
    let quotient = parseInt(total_item / page_per_item);
    let remainder = total_item % page_per_item;

    if (remainder === 0) {
        return quotient;
    } else {
        return ++quotient;
    }
}

const initialSate = {
    total_item: 0,
    page_per_item: 0,
    total_page: 0,
    cur_page: 0,
    focused_Index: 0,
    selected_index: 0,
    is_focus: false
};

export default function (state = initialSate, action) {
    let total_item = state.total_item;
    let page_per_item = state.page_per_item;
    let total_page = state.total_page;
    let cur_page = state.cur_page;
    let focused_Index = state.focused_Index;
    let is_focus = state.is_focus;
    switch (action.type) {
        case SET_LIST_INFO :
            return Object.assign({}, state, {
                total_item: action.payload.total_item,
                page_per_item: action.payload.page_per_item,
                total_page: calTotalPage(action.payload.total_item, action.payload.page_per_item),
                cur_page: 1,
                focused_Index: 0,
                selected_index: 0
            });
        case DESTROY_MENU_LIST :
            return [];
        case UP_LIST:
            if(!is_focus) {
                return state;
            }
            if (--focused_Index < 0) {
                if (cur_page === 1) {
                    cur_page = total_page;
                    focused_Index = total_item % page_per_item;

                    if (focused_Index === 0) {
                        focused_Index = page_per_item - 1;
                    } else {
                        focused_Index--;
                    }

                } else {
                    cur_page--;
                    focused_Index = page_per_item - 1;
                }
            }
            return Object.assign({}, state, {
                focused_Index: focused_Index,
                selected_index: focused_Index,
                cur_page: cur_page
            });
        case DOWN_LIST:
            if(!is_focus) {
                return state;
            }
            let cur_index = page_per_item * (cur_page - 1) + focused_Index;
            if (++focused_Index >= page_per_item || ++cur_index > total_item - 1) {
                if (cur_page === total_page) {
                    cur_page = 1;
                } else {
                    cur_page++;
                }
                focused_Index = 0;
            }
            return Object.assign({}, state, {
                focused_Index: focused_Index,
                selected_index: focused_Index,
                cur_page: cur_page
            });
        case SET_FOCUS :
            return Object.assign({}, state, {
                is_focus: action.payload.is_focus
            });
        default :
            return state
    }
}