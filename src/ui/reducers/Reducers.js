"use strict";
import {combineReducers} from "redux";
import ReducerMenuList from "./ReducerMenuList";
import ReducerUI from "./ReducerUI";
import ReducerMenuDetail from "./ReducerMenuDetail";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-10.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
export default combineReducers({
    ReducerUI,
    ReducerMenuList,
    ReducerMenuDetail
});