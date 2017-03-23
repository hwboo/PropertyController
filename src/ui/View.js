"use strict";
import React from "react";
import Container from "./Container";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-19.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class View extends Container {
    constructor(props) {
        super(props);
        this.type = Container.TYPE.VIEW;
        this.layer_id = props.layer_id;
        this.is_focus = props.is_focus;
        this.callback = props.callback;
    }
}

export default View;