"use strict";
import React, {Component} from 'react';

class Button extends Component {
    render() {
        let _style = {
            position: 'absolute',
            top: '15px',
            left: '0px',
            width: '200px',
            height: '50px',
            textAlign: 'center',
            fontSize: '39px'
        };

        if (this.props.focus) {
            _style.backgroundColor = 'blue';
        } else {
            _style.backgroundColor = 'inherit';
        }

        return (
            <div style={_style}>
                <span>{this.props.text}</span>
            </div>
        );
    }
}
export default Button;