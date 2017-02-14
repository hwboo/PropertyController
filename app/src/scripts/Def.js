"use strict";

/**
 * @fileoverview Name Space, 상수 Property 정의
 * @author hw.boo on 2017-02-12.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
/** Root Name space*/
var PC = PC || {};
(function () {
    //상위 Name Space 정의 --------------------------------------------------------------------------------------------------
    createNS("PC.Interface");
    createNS("PC.Main");
    createNS("PC.Utils");
    createNS("PC.Utils.Util");
    createNS("PC.UI");
    createNS("PC.Manager");
    createNS("PC.Config");
    createNS("PC.KEY");

    //Property Controller Callback RES_CODE --------------------------------------------------------------------------------------------------
    //TODO [hw.boo] 상수 관리를 Def 네임스페이스에서 하는게 맞는지, 아니면 각 Object에서 하는게
    createNS("PC.Def.Interface");
    createNS("PC.Def.Interface.RES_CODE");
    var res_code_obj = PC.Def.Interface.RES_CODE;
    defineConstant(res_code_obj, "ERR", 0x00);//오류
    defineConstant(res_code_obj, "SAVE", 0x01);//저장
    defineConstant(res_code_obj, "CANCEL", 0x02);//취소

    //KEY define --------------------------------------------------------------------------------------------------
    createNS("PC.Def.KEY_CODE");
    createNS("PC.Def.KEY_CODE.COMMON");
    createNS("PC.Def.KEY_CODE.STB");
    var common_key_obj = PC.Def.KEY_CODE.COMMON;
    defineConstant(common_key_obj, "LEFT", 37);
    defineConstant(common_key_obj, "RIGHT", 38);
    defineConstant(common_key_obj, "UP", 38);
    defineConstant(common_key_obj, "DOWN", 40);
    defineConstant(common_key_obj, "OK", 13);// Keyboard : "Enter"
    defineConstant(common_key_obj, "ENTER", 13);// Keyboard : "Enter"
    defineConstant(common_key_obj, "BACK", 8);// Keyboard : "BackSpace"
    defineConstant(common_key_obj, "EXIT", 35);// Keyboard : "End"
    defineConstant(common_key_obj, "NUM_0", 48);
    defineConstant(common_key_obj, "NUM_1", 49);
    defineConstant(common_key_obj, "NUM_2", 50);
    defineConstant(common_key_obj, "NUM_3", 51);
    defineConstant(common_key_obj, "NUM_4", 52);
    defineConstant(common_key_obj, "NUM_5", 53);
    defineConstant(common_key_obj, "NUM_6", 54);
    defineConstant(common_key_obj, "NUM_7", 55);
    defineConstant(common_key_obj, "NUM_8", 56);
    defineConstant(common_key_obj, "NUM_9", 57);
    var stb_key_obj = PC.Def.KEY_CODE.STB;
    defineConstant(stb_key_obj, "LEFT", window.VK_LEFT);//37
    defineConstant(stb_key_obj, "RIGHT", window.VK_RIGHT);//39
    defineConstant(stb_key_obj, "UP", window.window.VK_UP);//38
    defineConstant(stb_key_obj, "DOWN", window.VK_DOWN);//40
    defineConstant(stb_key_obj, "OK", window.VK_ENTER);//13
    defineConstant(stb_key_obj, "ENTER", window.VK_ENTER);//13
    defineConstant(stb_key_obj, "BACK", window.VK_BACK);//461
    defineConstant(stb_key_obj, "EXIT", window.VK_ESCAPE);//27
    defineConstant(stb_key_obj, "NUM_0", window.VK_0);//48
    defineConstant(stb_key_obj, "NUM_1", window.VK_1);//49
    defineConstant(stb_key_obj, "NUM_2", window.VK_2);//50
    defineConstant(stb_key_obj, "NUM_3", window.VK_3);//51
    defineConstant(stb_key_obj, "NUM_4", window.VK_4);//52
    defineConstant(stb_key_obj, "NUM_5", window.VK_5);//53
    defineConstant(stb_key_obj, "NUM_6", window.VK_6);//54
    defineConstant(stb_key_obj, "NUM_7", window.VK_7);//55
    defineConstant(stb_key_obj, "NUM_8", window.VK_8);//56
    defineConstant(stb_key_obj, "NUM_9", window.VK_9);//57

    /**
     * Name space를 정의한다.
     *
     * @param namespace
     * @returns {{}}
     */
    function createNS(namespace) {
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
    function defineConstant(object, property, value) {
        Object.defineProperty(object, property, {
            value: value,
            writable: false,
            configurable: false
        });
    }
})();


