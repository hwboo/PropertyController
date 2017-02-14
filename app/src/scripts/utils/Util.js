"use strict";

/**
 * @fileoverview
 * @author hw.boo on 2017-02-03.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
PC.Utils.Util = (function () {

    /**
     * Name space를 정의한다.
     *
     * @param namespace
     * @returns {{}}
     */
    function _createNS(namespace) {
        var ns_parts = namespace.split(".");
        var parent = PC;

        // we want to be able to include or exclude the root namespace
        // So we strip it if it's in the namespace
        if (ns_parts[0] === "PC") {
            ns_parts = ns_parts.slice(1);
        }

        // loop through the parts and create
        // a nested namespace if necessary
        for (var i = 0; i < ns_parts.length; i++) {
            var part_name = ns_parts[i];
            // check if the current parent already has
            // the namespace declared, if not create it
            if (typeof parent[part_name] === "undefined") {
                parent[part_name] = {};
            }
            // get a reference to the deepest element
            // in the hierarchy so far
            parent = parent[part_name];
        }
        // the parent is now completely constructed
        // with empty namespaces and can be used.
        return parent;
    }

    /**
     * Constant Property를 정의한다.
     *
     * @param object
     * @param property
     * @param value
     */
    function _defineConstant(object, property, value) {
        Object.defineProperty(object, property, {
            value: value,
            writable: false,
            configurable: false
        });
    }

    return {
        defineConstant: _defineConstant,
        createNS: _createNS
    }
})();