"use strict";

/**
 * @fileoverview Property Controller Interface
 * @author hw.boo on 2017-02-07.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
PC.Interface = (function () {

    /**
     * Property Controller 연동을 위한 초기화 작업 수행한다.
     *
     * @param data Property json data
     * @param callback Property Controller callback
     * @returns {boolean} 초기화 성공 여부
     * @private
     */
    function _init(data, callback) {
        return PC.Main.init(data, callback);
    }

    /**
     * Property Controller 시작한다.
     *
     * @private
     */
    function _start() {
        PC.Main.start();
    }

    /**
     * Property Controller 종료한다.
     *
     * @private
     */
    function _destroy() {
        PC.Main.destroy();
    }

    /**
     * Log 출력을 설정한다.
     *
     * @param log_output Log 출력 여부 (default value : false)
     * @param log_level Log Level (default value : 0)
     * @private
     */
    function _setLogOutput(log_output, log_level) {
        if (PC && PC.Utils && PC.Utils.Log) {
            PC.Utils.Log.setLogOutput(log_output, log_level);
        }
    }

    return {
        init: _init,
        start: _start,
        destroy: _destroy,
        setLogOutput: _setLogOutput
    }
})();
