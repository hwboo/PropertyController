"use strict";
import Log from '../utils/Log';

/**
 * @fileoverview Data Manager
 * @author hw.boo on 2017-02-23.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class DataManager {

    constructor() {
        /** Menu data map (key : category name, value : property value array) */
        this.menu_map = {};
        /** Log tag*/
        this.log_tag = "DataManager";
    }

    /**
     * Data를 초기화 한다.
     *
     * @param data
     * @returns {boolean}
     */
    init(data) {
        Log.printLog(this.log_tag, "called init() - data : " + data);
        let result = false;
        try {
            for (let key in data) {
                let temp = Object.assign({}, data[key], {'PROPERTY' : key});

                Log.printLog(this.log_tag, "init() - key : " + key + ", value : " + JSON.stringify(temp));
                if (!temp.CATEGORY || !temp.TYPE || temp.VALUE === undefined || temp.VALUE === null || !temp.USE) {
                    continue;
                }
                if (!this.menu_map[temp.CATEGORY]) {
                    this.menu_map[temp.CATEGORY] = new Array();
                }
                this.menu_map[temp.CATEGORY].push(temp);
            }
            if (Object.keys(this.menu_map).length > 0) {
                result = true;
            }
        } catch (e) {
            Log.printLog(this.log_tag, "init() - failed menu data init");
        }
        return result;
    }

    getMenuData() {
        return this.menu_map;
    }
}
export default new DataManager();