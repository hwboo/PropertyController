"use strict";

import ConfigJson from '../../config.json';

/**
 * @fileoverview
 * @author hw.boo on 2017-02-23.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Config {

    /**
     * Version을 반환한다.
     *
     * @returns {*}
     * @constructor
     */
    static get VERSION() {
        return ConfigJson.VERSION;
    }

    /**
     * Application mode 를 설정한다.
     *
     * @param app_mode "PC" or "STB"
     * @constructor
     */
    static set APP_MODE(app_mode) {
        if (!app_mode || (app_mode !== "PC" && app_mode !== "STB")) {
            app_mode = "PC";
        }
        ConfigJson.APP_MODE = app_mode;
    }

    /**
     * Application mode 를 반환한다.
     *
     * @returns {*}
     * @constructor
     */
    static get APP_MODE() {
        return ConfigJson.APP_MODE;
    }
}

export default Config;