"use strict";
import React, {Component} from 'react';
import css from './Number.css';

class NumberProp extends Component {

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
            <div className={css.number} style={style}>
                <span className={css.prop_name}>{this.props.data.PROPERTY}</span>

                <div className={css.number_box}>
                    <input className={css.value_box} type="text" value={this.props.data.VALUE}/>
                </div>
            </div>
        );
    }
}
export default NumberProp;