"use strict";
import Interface from './Interface';
import TestData from '../test/test_data.json';
import "babel-polyfill";

/**
 * @fileoverview
 * @author hw.boo on 2017-02-17.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
window.PC = {};
PC.Interface = Interface;

//TODO [hw.boo] 테스트
PC.Interface.setLogOutput(true);
PC.Interface.setAppMode(PC.Interface.APP_MODE.PC);
PC.Interface.init(TestData, callback);
PC.Interface.start();

function callback() {
}


