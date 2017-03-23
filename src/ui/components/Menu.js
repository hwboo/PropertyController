"use strict";
import React, {Component} from 'react';

/**
 * @fileoverview
 * @author hw.boo on 2017-02-23.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Menu extends Component {
    render() {
        let style = {};
        if(this.props.select) {
            style.color = 'red';
        }
        if (this.props.focus) {
            style.color = 'blue';
        }
        return (
            <div>
                <h3 style={style}>{this.props.name}</h3>
            </div>
        );
    }
}
export default Menu;