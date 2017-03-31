"use strict";
import React, {Component} from 'react';
import css from './css/StringProp.css';

class StringPopupProp extends Component {

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
            <div className={css.popup_class_item}>
                <div className={css.popup_title}>
                    <span>{this.props.data.PROPERTY}</span>
                </div>

                <div className={css.string}>
                    <div className={css.popup_content}>
                        <div className={css.content_key}>
                            <span>DES : </span>
                        </div>

                        <div className={css.content_value}>
                            <span>{this.props.data.DES} </span>
                        </div>
                    </div>


                    <div className={css.popup_content}>
                        <div className={css.content_key}>
                            <span>USE : </span>
                        </div>

                        <div className={css.content_value}>
                            <span>{this.props.data.USE? "TRUE" : "FALSE"} </span>
                        </div>
                    </div>

                    <div className={css.popup_content}>
                        <div className={css.content_key}>
                            <span>VALUE : </span>
                        </div>

                        <div className={css.content_value}>
                            <span>{this.props.data.VALUE} </span>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default StringPopupProp;