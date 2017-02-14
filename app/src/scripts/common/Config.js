"use strict";

/**
 * @fileoverview App 관련 환경 설정값 생성 및 관리
 * @author hw.boo on 2017-02-03.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
PC.Config = (function () {
    var log = PC.Utils.Log;
    jQuery.i18n.properties({
        name: 'config',
        path: 'res/prop/',
        mode: 'map'
    });

    /**
     * 설정값 초기화 한다.
     * @private
     */
    function _init() {
        log.printDbg("called _init()");
        PC.Config.VERSION = readStringConfig("VERSION", PC.Config.VERSION);
        //TODO [hw.boo] APP_MODE를 config 파일에 넣는게 낫을지...
        PC.Config.APP_MODE = readStringConfig("APP_MODE", PC.Config.APP_MODE);
    }

    /**
     * Boolean value 값을 읽는다.
     *
     * @param key
     * @param default_val
     * @returns {boolean}
     */
    function readBooleanConfig(key, default_val) {
        return Boolean(readStringConfig(key, default_val));
    }

    /**
     * Number value 값을 읽는다.
     *
     * @param key
     * @param default_val
     * @returns {number}
     */
    function readNumberConfig(key, default_val) {
        return Number(readStringConfig(key, default_val));
    }

    /**
     * String value 값을 읽는다.
     *
     * @param key
     * @param default_val
     * @returns {*}
     */
    function readStringConfig(key, default_val) {
        var value = jQuery.i18n.prop(key);
        if (value === "[" + key + "]") {
            value = default_val;
        }
        return value;
    }

    return {
        init: _init,
    }
})();

//Config
PC.Config.VERSION = "0.0.0";
PC.Config.APP_MODE = "PC";
