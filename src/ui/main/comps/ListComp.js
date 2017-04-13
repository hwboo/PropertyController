"use strict";
import React, {Component} from 'react';
import css from './css/List.css';
import ScrollBar from '../comps/ScrollBar';

class ListComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _use : props.use,
            _value : props.value
        };
    }

    render() {
        /* data ==> { CATEGORY, TYPE, VALUE, DES, USE, PROPERTY } */
        return (
            <div className={css.popup_class_item}>
                <div className={css.popup_title}>
                    <span>{this.props.property}</span>
                </div>

                <div className={css.list}>
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

                    {
                        !this.props.is_value_entered ?
                            <div className={css.popup_content}>
                                <div className={css.content_key}>
                                    <span>VALUE : </span>
                                </div>

                                <div className={this.props.focus === 2 ? css.selected : css.content_value}>
                                    <span>{this.props.value}</span>
                                </div>
                            </div>

                            :

                            <div className={css.popup_content}>
                                <div className={css.content_key}>
                                    <span>VALUE : </span>
                                </div>

                                {
                                    this.props.value_list.map((data, idx) =>
                                        <div className={this.props.list_focus === idx ? css.selected : css.content_value}
                                             style={{top : (5 + (idx * 40))+ 'px'}} key={this.props.property + "_value" + idx}>
                                            <span>{data}</span>
                                        </div>
                                )}

                                <ScrollBar total_page={this.props.total_page}
                                           cur_page={this.props.cur_page}
                                           height={this.props.height}
                                           left={this.props.left}
                                           top={this.props.top}/>

                            </div>
                    }
                </div>

            </div>
        );
    }
}
export default ListComp;