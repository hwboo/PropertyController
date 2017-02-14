"use strict";

/**
 * @fileoverview Menu 구성 관리 Manager
 * @author hw.boo on 2017-02-14.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
PC.Manager.MenuDataManager = (function () {
    /** Log object */
    var log = PC.Utils.Log;
    /** Menu Map (key : category name, value : property value array) */
    var menu_map = {};

    function _init(data) {
        log.printDbg("called _init()");
        var result = false;
        try {
            for (var key in data) {
                var temp = data[key];
                log.printDbg("_init() - key : " + key + ", value : " + JSON.stringify(temp));
                if (!temp.CATEGORY || !temp.TYPE || temp.VALUE === undefined || temp.VALUE === null || !temp.USE) {
                    continue;
                }
                if (!menu_map[temp.CATEGORY]) {
                    menu_map[temp.CATEGORY] = new Array();
                }
                menu_map[temp.CATEGORY].push(temp);
            }
            if (Object.keys(menu_map).length > 0) {
                result = true;
            }
        } catch (e) {
            log.printErr("_init() - failed menu data init");
            log.printExec(e);
        }
        log.printDbg("_init() - result : " + result);
        return result;
    }

    /**
     *
     * @returns {*}
     * @private
     */
    function _getMenuArr() {
        return menu_map;
    }

    return {
        init: _init,
        getMenuArr: _getMenuArr
    }
}());