"use strict";
import React, {Component} from 'react';
import css from './Boolean.css';

class BooleanProp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = {};

        if(this.props.focus) {
            style.backgroundColor = 'blue';
        }
        if( this.props.select ) {
            style.color = 'red';
        }

        /* data ==> { CATEGORY, TYPE, VALUE, DES, USE, PROPERTY } */
        return (
            <div className={css.boolean} style={style}>
                <span className={css.prop_name}>{this.props.data.PROPERTY}</span>

                <div className={css.boolean_box}>
                    <div className={css.left_btn}>
                        <span className={css.btn_txt}>TRUE</span>
                    </div>
                    <div className={css.right_btn}>
                        <span className={css.btn_txt}>FALSE</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default BooleanProp;