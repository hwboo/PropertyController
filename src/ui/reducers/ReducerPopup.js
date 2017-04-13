"use strict";
import {SET_POPUP_INFO, SET_LIST_VALUES, UP_PROPERTY, UP_LIST_VALUE, DOWN_PROPERTY, DOWN_LIST_VALUE, LEFT_PROPERTY, RIGHT_PROPERTY} from '../actions/ActionPopup';

/**
 * Created by si.mun on 2017-03-31.
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

const initialState = {
    total_item: 4,
    focused_Index: 0,
    selected_index: 0,
    btn_focus: "left",

    // List Type에서만 쓰이는 state data
    total_list_item: 0,
    page_per_list_item: 3,
    total_list_page: 1,
    cur_list_page: 1,
    focused_list_Index: 0,
};

export default function (state = initialState, action) {
    let total_item = state.total_item;
    let focused_Index = state.focused_Index;
    let btn_focus = state.btn_focus;
    let where = "";

    // List Type에서만 쓰이는 state data
    let total_list_item = state.total_list_item;
    let page_per_list_item = state.page_per_list_item;
    let total_list_page = state.total_list_page;
    let cur_list_page = state.cur_list_page;
    let focused_list_Index = state.focused_list_Index;




    switch(action.type) {
        case SET_POPUP_INFO :
            return Object.assign({}, state, initialState);
        case UP_PROPERTY :
            if (focused_Index - 1 < 0 ) {
                focused_Index = 3;
            }
            else {
                focused_Index--;
            }
            return Object.assign({}, state, {focused_Index : focused_Index});
        case DOWN_PROPERTY :
            if (focused_Index + 1 >= total_item ) {
                focused_Index = 0;
            } else {
                focused_Index++;
            }
            return Object.assign({}, state, {focused_Index : focused_Index});
        case LEFT_PROPERTY :
            if (focused_Index === 3) {
                if ( btn_focus === "left" ) {
                    where = "right";
                }
                else {
                    where = "left";
                }
                return Object.assign({}, state, {btn_focus : where});
            }
        case RIGHT_PROPERTY :
            if (focused_Index === 3) {
                if ( btn_focus === "right" ) {
                    where = "left";
                }
                else {
                    where = "right";
                }
                return Object.assign({}, state, {btn_focus : where});
            }



        case SET_LIST_VALUES :
            return Object.assign({}, state, {
                // List Type에서만 쓰이는 state data
                total_list_item: action.payload.total_list_item,
                page_per_list_item: 3,
                total_list_page: calTotalPage(action.payload.total_list_item,action.payload.page_per_list_item),
                cur_list_page: 1,
                focused_list_Index: 0,
            })
        case UP_LIST_VALUE :
            if (--focused_list_Index < 0) {
                if (cur_list_page === 1) {
                    cur_list_page = total_list_page;
                    focused_list_Index = total_list_item % page_per_list_item;

                    if (focused_list_Index === 0) {
                        focused_list_Index = page_per_list_item - 1;
                    }
                    else
                        focused_list_Index--;
                } else {
                    cur_list_page--;
                    focused_list_Index = page_per_list_item - 1;
                }
            }
            return Object.assign({}, state, {
                focused_list_Index: focused_list_Index,
                cur_list_page: cur_list_page
            });
        case DOWN_LIST_VALUE :
            let cur_index = page_per_list_item * (cur_list_page - 1) + focused_list_Index;
            if (++focused_list_Index >= page_per_list_item || ++cur_index > total_list_item - 1) {
                if (cur_list_page === total_list_page) {
                    cur_list_page = 1;
                } else {
                    cur_list_page++;
                }
                focused_list_Index = 0;
            }
            return Object.assign({}, state, {
                focused_list_Index: focused_list_Index,
                cur_list_page: cur_list_page
            });
        default :
            return state
    }
}