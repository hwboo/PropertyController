"use strict";
import Log from '../utils/Log';

/**
 * @fileoverview Data Manager
 * @author hw.boo on 2017-02-23.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */


function copyObj(obj) {
    var copy = {};
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = copyObj(obj[attr]);
        }
    }
    return copy;
}

class DataManager {

    constructor() {
        /** Menu data map (key : category name, value : property value array) */
        this.menu_map = {};
        /** Log tag*/
        this.log_tag = "DataManager";
        /* state에서 menu data들의 key를 저장해놓은 배열 */
        this.key_array = [];
        /* Property Controller에서 사용할 데이터 */
        this.origin_properties = {};
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

                let temp = Object.assign({}, data[key]);

                Log.printLog(this.log_tag, "init() - key : " + key + ", value : " + JSON.stringify(temp));
                if (!temp.CATEGORY || !temp.TYPE || temp.VALUE === undefined || temp.VALUE === null) {
                    continue;
                }
                if (!this.menu_map[temp.CATEGORY]) {
                    this.menu_map[temp.CATEGORY] = new Array();
                    this.origin_properties[temp.CATEGORY] = new Array();
                }

                if (this.key_array.indexOf(temp.CATEGORY) < 0) {
                    this.key_array[index++] = temp.CATEGORY;
                }

                if (temp.TYPE === "List") {
                    this.menu_map[temp.CATEGORY].push(Object.assign({}, temp, {'PROPERTY' : key, 'VALUE_LIST' : temp.VALUE_LIST.slice()}));
                    this.origin_properties[temp.CATEGORY].push(Object.assign({}, temp, {'PROPERTY' : key, 'VALUE_LIST' : temp.VALUE_LIST.slice()}));
                } else {
                    this.menu_map[temp.CATEGORY].push(Object.assign({}, temp, {'PROPERTY' : key}));
                    this.origin_properties[temp.CATEGORY].push(Object.assign({}, temp, {'PROPERTY' : key}));
                }

            }
            if (Object.keys(this.menu_map).length > 0) {
                result = true;
            }


            // console.log(this.menu_map);
            // console.log(this.origin_properties);
            // this.origin_properties = $.extend(true,{},this.menu_map);


            // console.log(this.origin_properties);
            // this.origin_properties = copyObj(this.menu_map);
            // this.origin_properties = Object.assign({}, this.menu_map);
            // this.origin_properties = update(this.menu_map, {$apply: (value) => (value)});
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

    getDetailData(category) {
        let result = JSON.parse(JSON.stringify( this.menu_map ));

        if (!category) {
            return result[this.getKeyArray()[0]];
        }
        return result[category];
    }

    setDetailData(args) {
        // throw new Error();
        let focused_view_Index = args.focused_detail_view_Index;
        let changed_arr = this.menu_map[args.category]; //DEBUG_MODE1 or DEBUG_MODE2가 추출됨.

        if (changed_arr[focused_view_Index].USE !== args.changed_use)
            changed_arr[focused_view_Index].USE = args.changed_use;

        if (changed_arr[focused_view_Index].VALUE !== args.changed_value) {
            changed_arr[focused_view_Index].VALUE = args.changed_value;
        }

        if (changed_arr[focused_view_Index].VALUE_LIST
            && changed_arr[focused_view_Index].VALUE_LIST != args.changed_value_list) {
            changed_arr[focused_view_Index].VALUE_LIST = args.changed_value_list;
        }
    }

    getProperties() {
        return this.origin_properties;
    }

    setProperties() {

        for(let idx in this.origin_properties) { // DEBUG_MODE1, 2

            for(let key in this.origin_properties[idx]) {
                this.origin_properties[idx][key]["USE"] = this.menu_map[idx][key]["USE"];
                this.origin_properties[idx][key]["VALUE"] = this.menu_map[idx][key]["VALUE"];

                let type = this.origin_properties[idx][key].TYPE;
                if (type === "List") {
                    this.origin_properties[idx][key]["VALUE_LIST"] = this.menu_map[idx][key]["VALUE_LIST"].slice();
                }
            }
        }
    }
}
export default new DataManager();