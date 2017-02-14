"use strict";

/**
 * @fileoverview Property Controller Main Method
 * @author hw.boo on 2017-02-13.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
PC.Main = (function () {
    /** Log Object. */
    var log = PC.Utils.Log;

    /**
     * Property Controller 연동을 위한 초기화 작업 수행한다.
     *
     * @param data Property json data
     * @param callback Property Controller callback
     * @returns {boolean} 초기화 성공 여부
     * @private
     */
    function _init(data, callback) {
        log.printDbg("called init()");
        var result = false;
        if (!data || !callback) {
            log.printDbg("init() - return false, invalid parameter");
            return result;
        }
        PC.Config.init();
        PC.KEY = PC.Config.APP_MODE === "PC" ? PC.Def.KEY_CODE.COMMON : PC.Def.KEY_CODE.STB;
        result = PC.Manager.MenuDataManager.init(data);
        return result;
    }

    /**
     * Property Controller 시작한다.
     *
     * @private
     */
    function _start() {
        log.printDbg("called _start()");
        $("body").on("keydown", handleKeyEvent);
        window.focus();
    }

    /**
     * Property Controller 종료한다.
     *
     * @private
     */
    function _destroy() {
        log.printDbg("called _destroy()");
    }

    /**
     * Key Event를 처리한다.
     *
     * @param event key event
     */
    function handleKeyEvent(event) {
        log.printDbg("called handleKeyEvent() key code : " + event.keyCode);
    }

    return {
        init: _init,
        start: _start,
        destroy: _destroy
    }
})();