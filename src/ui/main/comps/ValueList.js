"use strict";
import React, {Component} from 'react';
import css from './css/List.css';

class ValueList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

                <div className={css.selected} style={{top : (5 + (this.props.idx * 40))+ 'px'}} >
                    <span>{this.props.value_list}</span>
                </div>

        );
    }
}
export default ValueList;