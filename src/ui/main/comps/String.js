"use strict";
import React, {Component} from 'react';
import css from './css/StringProp.css';

class String extends Component {

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
                    <span>{this.props.property}</span>
                </div>

                <div className={css.string}>
                    <div className={css.popup_content}>
                        <div className={css.content_key}>
                            <span>DES : </span>
                        </div>

                        <div className={this.props.focus === 0 ? css.selected : css.content_value}>
                            <span>{this.props.des} </span>
                        </div>
                    </div>

                    <div className={css.popup_content}>
                        <div className={css.content_key}>
                            <span>USE : </span>
                        </div>

                        <div className={css.content_value}>
                            <div className={css.toggle_btn} style={{ opacity : this.props.focus === 1 ? 1 : 0.5 }}>
                                <span className={css.btn_txt}>{this.props.use? "USE" : "NOT USE"}</span>
                            </div>
                        </div>
                    </div>

                    <div className={css.popup_content}>
                        <div className={css.content_key}>
                            <span>VALUE : </span>
                        </div>

                        <div className={this.props.focus === 2 ? css.selected : css.content_value}>
                            <span>{this.props.value}</span>
                        </div>
                    </div>
                </div>

            </div>
        );

        // return (
        //     <div className={css.popup_class_item}>
        //         <div className={css.popup_title}>
        //             <span>{this.props.property}</span>
        //         </div>
        //
        //         <div className={css.string}>
        //             <div className={css.popup_content}>
        //                 <div className={css.content_key}>
        //                     <span>DES : </span>
        //                 </div>
        //
        //                 <div className={this.props.focus === 0 ? css.selected : css.content_value}>
        //                     <span>{this.props.des} </span>
        //                 </div>
        //             </div>
        //
        //             <div className={css.popup_content}>
        //                 <div className={css.content_key}>
        //                     <span>USE : </span>
        //                 </div>
        //
        //                 <div className={css.content_value}>
        //                     <div className={css.toggle_btn} style={{ opacity : this.props.focus === 1 ? 1 : 0.5 }}>
        //                         <span className={css.btn_txt}>{this.props.use? "USE" : "NOT USE"}</span>
        //                     </div>
        //                 </div>
        //             </div>
        //
        //             <div className={css.popup_content}>
        //                 <div className={css.content_key}>
        //                     <span>VALUE : </span>
        //                 </div>
        //
        //                 <div className={this.props.focus === 2 ? css.selected : css.content_value}>
        //                     <span>{this.props.value}</span>
        //                 </div>
        //             </div>
        //         </div>
        //
        //     </div>
        // );
    }
}
export default String;