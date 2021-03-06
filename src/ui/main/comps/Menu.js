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
        let div_style = {
            position: 'relative',
            width: '200px',
            height: '70px',
            top: '5px',
            textAlign : 'center',
        };

        let span_style = {
            position: 'absolute',
            top : '17px',
            left : '12px',
            fontSize : '24px',
        };

        if(this.props.select) {
            span_style.color = 'red';
            div_style.backgroundColor = 'rgb(176, 224, 230)';
        }
        if (this.props.focus) {
            span_style.color = 'blue';
            div_style.backgroundColor = 'rgb(176, 224, 230)';
        }

        return (
            <div style={div_style}>
                <span style={span_style}>{this.props.name}</span>
            </div>
        );
    }
}
export default Menu;