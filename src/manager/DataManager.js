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
        /* state에서 menu data들의 key를 저장해놓은 배열 */
        this.key_array = [];
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
        let index = 0;

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

                if (this.key_array.indexOf(temp.CATEGORY) < 0) {
                    this.key_array[index++] = temp.CATEGORY;
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

    getKeyArray() {
        return this.key_array;
    }

    getMenuData() {
        return this.menu_map;
    }

    getDetailData(index) {
        let ret_arr = this.getKeyArray();
        // [si.mun] key값을 저장하고있는 array에서 인자로 전달받은 index에 해당하는 key를 반한해준다.
        return this.menu_map[ret_arr[index]];
    }

    getPopupData(detail_index, popup_index) {
        let detail_data = this.getDetailData(detail_index);
        return detail_data[popup_index];
    }
}
export default new DataManager();