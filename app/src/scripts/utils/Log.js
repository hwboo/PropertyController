"use strict";

/**
 * @fileoverview Log 출력 관련 Obj
 * @author hw.boo on 2017-02-03.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
PC.Utils.Log = (function () {

    var LEVEL = {
        DBG: 0,
        INFO: 1,
        WARN: 2,
        ERR: 3
    };

    var INCLUDE_TIME = true;
    var INCLUDE_DATE = false;
    var INCLUDE_TIMESTAMP = false;
    var ENABLE_OSD_LOG = false;

    var log_output = false;
    var log_level = LEVEL.DBG;
    var dbg = LEVEL.DBG;
    var info = LEVEL.INFO;
    var warn = LEVEL.WARN;
    var err = LEVEL.ERR;

    var initial_timestamp = new Date().getTime();

    var osd_log_area = null;

    function _setLogOutput(output, level) {
        if (typeof output !== "boolean") {
            output = false;
        }
        if (typeof level !== "number") {
            level = LEVEL.DBG;
        }
        log_output = output;
        log_level = level;
        dbg = log_level <= LEVEL.DBG;
        info = log_level <= LEVEL.INFO;
        warn = log_level <= LEVEL.WARN;
        err = log_level <= LEVEL.ERR;
    }

    function _isLogOutput() {
        return log_output;
    }

    function _getLogLevel() {
        return log_level;
    }

    function _getHeader(prefix, e) {
        var header = null;
        var index = -1;
        try {
            if (e === undefined) {
                throw new Error();
            }
        } catch (error) {
            e = error;
            index = 2;
        } finally {
            header = traceCaller(index, e);
        }

        if (header === null || header === undefined) {
            if (prefix === null || prefix === undefined) {
                return "";
            }
            else {
                header = prefix;
            }
        }
        else {
            if (prefix !== null && prefix !== undefined) {
                header = prefix + "-" + header;
            }
        }

        return "[" + header + "]";
    }

    function _getTimestamp() {
        var timestamp = "[";
        var date = new Date();
        if (INCLUDE_TIME === true) {
            var diff = date.getTime() - initial_timestamp;

            var ms = diff % 1000;
            diff = (diff - ms) / 1000;
            var secs = diff % 60;
            var mins = (diff - secs) / 60;

            if (mins < 10) {
                mins = pad(mins, 2);
            }

            timestamp += mins + ':' + pad(secs, 2) + ':' + pad(ms, 3);
        }
        if (INCLUDE_DATE === true) {
            timestamp += "/" + date.toLocaleString();
        }
        if (INCLUDE_TIMESTAMP === true) {
            timestamp += "/" + date.getTime();
        }

        return timestamp + "]";
    }

    function getFunctionName(object) {
        var is_function = typeof object == 'function';
        var function_name = is_function && ((object.name && ['', object.name]) ||
            object.toString().match(/function ([^\(]+)/));

        if (is_function) {
            return (function_name && function_name[1] || 'anonymous');
        }

        return object === undefined ? "" : object;
    }

    function getMessage(msg, long) {

        if (long === undefined && msg !== undefined) {
            return (msg.length > 1000) ? msg.substr(0, 999) : msg
        }

        return msg;
    }

    function _printLog(type, msg, header, forced, object, long, color) {
        if (log_output === false && forced != true) {
            return;
        }

        var message = "";

        switch (type) {
            case LEVEL.DBG :
                if (dbg) {

                    message = _getTimestamp() + _getHeader(header) + " " +
                        getMessage(msg, long) + getFunctionName(object);

                    if (color) {
                        console.log("%c" + message, color);
                    }
                    else {
                        console.log(message);
                    }
                }
                break;
            case LEVEL.INFO :
                if (info) {
                    message = _getTimestamp() + _getHeader(header) + " " +
                        getMessage(msg, long) + getFunctionName(object);

                    console.info("%c" + message, "color: #001a9e");
                }
                break;
            case LEVEL.WARN :
                if (warn) {
                    message = _getTimestamp() + _getHeader(header) + " " +
                        getMessage(msg, long) + getFunctionName(object);

                    console.warn("%c" + message, "color: #ff6e00");
                }
                break;
            case LEVEL.ERR :
                if (err) {
                    message = _getTimestamp() + _getHeader(header) + " " +
                        getMessage(msg, long) + getFunctionName(object);

                    if (color) {
                        console.debug("%c" + message, color);
                    }
                    else {
                        console.error(message);
                    }
                }
                break;
        }
    }

    function _printExec(e, header) {
        if (log_output) {
            console.error(_getHeader(header, e) + " Error(" + (e.number & 0xFFFF) + "):" + e.name + "-" + e.message);
            console.trace();
        }
    }

    function _printOSDLog(message) {
        if (ENABLE_OSD_LOG) {

            if (osd_log_area === null) {
                osd_log_area = document.getElementById("osd_log_area");
                _setOSDLogVisibility(true);
            }

            // Make the new log message element
            var msg = document.createElement("span");
            msg.appendChild(document.createTextNode(message));
            msg.appendChild(document.createElement("br"));

            // Append the new message to the chat
            osd_log_area.appendChild(msg);

            // Trim the log to 500 messages
            if (osd_log_area.childNodes.length > 500) {
                osd_log_area.removeChild(osd_log_area.firstChild);
            }
        }
    }

    /**
     * control OSD log div visibility
     */
    function _setOSDLogVisibility(visible) {
        if (ENABLE_OSD_LOG) {
            if (osd_log_area !== null) {
                if (visible) {
                    osd_log_area.style.display = 'block';
                }
                else {
                    osd_log_area.style.display = 'none';
                }
            }
        }
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function traceCaller(n, e) {
        if (isNaN(n) || n < 0) {
            n = 0;
        }
        else {
            //TODO 아래 사항 어떻게 처리할지 고민...
            if (PC.Config.APP_MODE === "PC") {
                n += 1;
            }
        }

        var s = e.stack;

        //console.info("traceCaller = " + s + " -- end");

        var a = s.indexOf('\n', 5);
        while (n--) {
            a = s.indexOf('\n', a + 1);
            if (a < 0) {
                a = s.lastIndexOf('\n', s.length);
                break;
            }
        }
        var b = s.indexOf('\n', a + 1);
        if (b < 0) {
            b = s.length;
        }
        a = Math.max(s.lastIndexOf(' ', b), s.lastIndexOf('/', b));
        b = s.lastIndexOf(':', b);
        var c = s.indexOf('?', a + 1);
        var d, e, temp, result;
        if (c >= 0) {
            temp = s.substring(a + 1, c)
            e = temp.indexOf(':');
            if (e < 0) {
                d = s.lastIndexOf(':', b - 1);
                result = s.substring(a + 1, c);
                result += s.substring(d, b);
            }
            else {
                e = temp.indexOf(':', e + 1);
                result = temp.substring(0, e);
            }
        }
        else {
            result = s.substring(a + 1, b);
        }

        return result;
    }

    function _stringify() {
        if (log_output == true) {
            return JSON.stringify.apply(JSON, arguments);
        }
    }

    return {
        setLogOutput: _setLogOutput,
        isLogOutput: _isLogOutput,
        getLogLevel: _getLogLevel,
        printDbg: function (msg, header, object) {
            _printLog(LEVEL.DBG, msg, header, false, object);
        },
        printLongDbg: function (msg, header, object) {
            _printLog(LEVEL.DBG, msg, header, false, object, true);
        },
        printInfo: function (msg, header, object) {
            _printLog(LEVEL.INFO, msg, header, false, object);
        },
        printWarn: function (msg, header) {
            _printLog(LEVEL.WARN, msg, header);
        },
        printErr: function (msg, header) {
            _printLog(LEVEL.ERR, msg, header);
        },
        printExec: function (e, header) {
            _printExec(e, header);
        },
        printForced: function (msg, header) {
            _printLog(LEVEL.ERR, msg, header, true, undefined, false, "color: #2f9e00");
        },
        printOSDLog: function (msg) {
            _printOSDLog(msg);
        },
        setOSDLogVisibility: function (enable) {
            _setOSDLogVisibility(enable);
        },
        stringify: _stringify,
    };
}());