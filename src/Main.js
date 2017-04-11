"use strict";
import React from "react";
import Log from "./utils/Log";
import Config from "./common/Config";
import DataManager from "./manager/DataManager";
import UIManager from "./manager/UIManager";

/**
 * @fileoverview
 * @author hw.boo on 2017-02-19.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Main {
    constructor() {
        Log.setAppName("PropertyController_" + Config.VERSION);
        this.listener = null;
        this.log_tag = "Main";
    }

    /**
     * Property Controller 연동을 위한 초기화 작업 수행한다.
     *
     * @param data
     * @param callback
     * @returns {boolean}
     */
    init(data, callback) {
        Log.printLog(this.log_tag, "called init() - data : " + data + ", callback : " + callback);
        if (!data || !callback) {
            return false;
        }

        DataManager.init(data);
        this.listener = callback;
    }

    /**
     * Property Controller 시작한다.
     */
    start() {
        Log.printLog(this.log_tag, "called start()");
        UIManager.start();
    }

    exit(res_code, data) {
        this.listener(res_code, data);
    }
}
export default new Main();