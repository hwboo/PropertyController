"use strict";
import Config from './Config';

/**
 * @fileoverview
 * @author hw.boo on 2017-02-24.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */

let KEY_PC = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    OK: 13,// Keyboard : "Enter"
    ENTER: 13,
    BACK: 8,// Keyboard : "BackSpace"
    EXIT: 35,// Keyboard : "End"
    NUM_0: 48,
    NUM_1: 49,
    NUM_2: 50,
    NUM_3: 51,
    NUM_4: 52,
    NUM_5: 53,
    NUM_6: 54,
    NUM_7: 55,
    NUM_8: 56,
    NUM_9: 57,
};

let KEY_STB = {
    LEFT: window.VK_LEFT,
    RIGHT: window.VK_RIGHT,
    UP: window.window.VK_UP,
    DOWN: window.VK_DOWN,
    OK: window.VK_ENTER,
    ENTER: window.VK_ENTER,
    BACK: window.VK_BACK,
    EXIT: window.VK_ESCAPE,
    NUM_0: window.VK_0,
    NUM_1: window.VK_1,
    NUM_2: window.VK_2,
    NUM_3: window.VK_3,
    NUM_4: window.VK_4,
    NUM_5: window.VK_5,
    NUM_6: window.VK_6,
    NUM_7: window.VK_7,
    NUM_8: window.VK_8,
    NUM_9: window.VK_9,
};
export default Config.APP_MODE === "PC" ? KEY_PC : KEY_STB;