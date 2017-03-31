"use strict";
import React, {Component} from 'react';
import css from './css/Content.css';

class Content extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = {};
        let prop_value_display = null;

        if(this.props.focus) {
            style.backgroundColor = 'blue';
        }
        if( this.props.select ) {
            style.color = 'red';
        }

        if (this.props.data.TYPE === 'Boolean') {
            prop_value_display = <span className={css.prop_value_display}>{this.props.data.VALUE ? "TRUE" : "FALSE"}</span>
        }
        else {
            prop_value_display = <span className={css.prop_value_display}>{this.props.data.VALUE}</span>
        }

        /* data ==> { CATEGORY, TYPE, VALUE, DES, USE, PROPERTY } */
        return (
            <div className={css.content} style={style}>
                <span className={css.prop_name}>{this.props.data.PROPERTY}</span>

                <div className={css.prop_value}>
                    {prop_value_display}
                </div>
            </div>
        );
    }
}
export default Content;