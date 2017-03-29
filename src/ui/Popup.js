"use strict";
import React from "react";
import Container from "./Container";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-15.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Popup extends Container {
    constructor(props) {
        super(props);
        this.type = Container.TYPE.POPUP;
    }
}
Popup.propTypes = {
    layer_id: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
};
export default Popup;