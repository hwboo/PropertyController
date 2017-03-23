"use strict";
import Main from "./Main";
import Log from './utils/Log';
import Config from './common/Config'

/** 결과 코드*/
const RES_CODE = {
    ERR: 0x00,//오류
    SAVE: 0x01,//저장
    CANCEL: 0x02//취소
};

/** APP MODE*/
const APP_MODE = {
    PC: "PC",
    STB: "STB"
};

/**
 * @fileoverview Property Controller Interface
 * @author hw.boo on 2017-02-23.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Interface {

    /**
     * Property Controller 연동을 위한 초기화 작업 수행한다.
     *
     * @param data Property json data
     * @param callback Property Controller callback
     * @returns {boolean} 초기화 성공 여부
     */
    init(data, callback) {
        return Main.init(data, callback);
    }

    /**
     * Property Controller 시작한다.
     */
    start() {
        Main.start();
    }

    /**
     * Property Controller 종료한다.
     */
    destroy() {
    }

    /**
     * Log 출력을 설정한다.
     *
     * @param log_output Log 출력 여부 (default value : false)
     */
    setLogOutput(log_output) {
        Log.setLogOutput(log_output);
    }

    /**
     * App Mode를 설정한다.
     *
     * @param app_mode "PC" or "STB" (default value : "PC")
     */
    setAppMode(app_mode) {
        Config.APP_MODE = app_mode;
    }

    /**
     * 결과 코드를 반환한다.
     *
     * @returns {{ERR: 0x00, SAVE: 0x01, CANCEL: 0x02}}
     * @constructor
     */
    get RES_CODE() {
        return RES_CODE;
    }

    /**
     * Application mode를 반환한다.
     *
     * @returns {{PC: "PC", STB: "STB"}}
     * @constructor
     */
    get APP_MODE() {
        return APP_MODE;
    }
}
export default new Interface();