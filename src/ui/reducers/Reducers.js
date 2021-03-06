"use strict";
import {combineReducers} from "redux";
import ReducerMenuList from "./ReducerMenuList";
import ReducerUI from "./ReducerUI";
import ReducerMenuDetail from "./ReducerMenuDetail";
import ReducerMenuSave from "./ReducerMenuSave";
import ReducerPopup from "./ReducerPopup";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-10.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
export default combineReducers({
    ReducerUI,
    ReducerMenuList,
    ReducerMenuDetail,
    ReducerMenuSave,
    ReducerPopup
});