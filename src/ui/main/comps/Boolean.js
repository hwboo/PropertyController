"use strict";
import React, {Component} from 'react';
import css from './css/BooleanProp.css';

class BooleanPopupProp extends Component {

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

                <div className={css.boolean}>
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
                            <div className={css.left_btn}>
                                <span className={css.btn_txt}>TRUE</span>
                            </div>
                            <div className={css.right_btn}>
                                <span className={css.btn_txt}>FALSE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BooleanPopupProp;