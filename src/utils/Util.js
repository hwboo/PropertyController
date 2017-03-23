"use strict";

/**
 * @fileoverview
 * @author hw.boo on 2017-02-19.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
export function getComponentName(class_info) {
    let class_name;
    if(class_info.displayName) {
        class_name = class_info.displayName.slice(8, class_info.displayName.length - 1);
    } else {
        class_name = class_info.name;
    }
    return class_name;
}