"use strict";

/**
 * @fileoverview Log print
 * @author hw.boo on 2017-02-19.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Log {
    constructor() {
        /** 로그 출력 여부*/
        this.log_output = false;
        /** 초기 시간값*/
        this.initial_timestamp = new Date().getTime();
        /** App name*/
        this.app_name = "";
    }

    /**
     * 로그 출력 여부를 설정한다.
     *
     * @param log_output
     */
    setLogOutput(log_output) {
        if (typeof log_output !== "boolean") {
            log_output = false;
        }
        this.log_output = log_output;
    };

    /**
     * 로그 출력 여부를 반환한다.
     *
     * @returns {boolean}
     */
    getLogOutput() {
        return this.log_output;
    }

    /**
     * App 명칭을 저장한다.
     *
     * @param app_name
     */
    setAppName(app_name) {
        this.app_name = app_name;
    }

    /**
     * 로그를 출력한다.
     *
     * @param str
     */
    printLog(tag, str) {
        if (this.log_output === false || !str) {
            return;
        }
        let message = this._getTimestamp() + this._getHeader(tag) + str;
        console.log(message);
    }

    _getTimestamp() {
        let timestamp = "[";
        let date = new Date();
        let diff = date.getTime() - this.initial_timestamp;
        let ms = diff % 1000;
        diff = (diff - ms) / 1000;
        let secs = diff % 60;
        let mins = (diff - secs) / 60;
        if (mins < 10) {
            mins = this._pad(mins, 2);
        }
        timestamp += mins + ':' + this._pad(secs, 2) + ':' + this._pad(ms, 3);
        return timestamp + "]";
    }

    _pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    _getHeader(tag) {
        return "[" + this.app_name + "]" + tag + "|";
    }

    // _getHeader(prefix, e) {
    //     var header = null;
    //     try {
    //         if (e === undefined) {
    //             throw new Error();
    //         }
    //     } catch (error) {
    //         e = error;
    //     } finally {
    //         header = this._traceCaller(e);
    //     }
    //
    //     if (header === null || header === undefined) {
    //         if (prefix === null || prefix === undefined) {
    //             return "";
    //         } else {
    //             header = prefix;
    //         }
    //     } else {
    //         if (prefix !== null && prefix !== undefined) {
    //             header = prefix + "-" + header;
    //         }
    //     }
    //     return "[" + this.app_name + "]" + header + "|";
    // }
    //
    // _traceCaller(e) {
    //     window.s = e.stack;
    //     let s = e.stack.split('\n')[3];
    //     let last_index = s.indexOf('.');
    //     let result = s.substring(7, last_index);
    //     return result;
    // }
}

export default new Log();
