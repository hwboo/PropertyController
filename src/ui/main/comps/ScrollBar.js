"use strict";
import React, {Component} from 'react';
import css from './css/Scroll.css';

class ScrollBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let _height = (this.props.height? this.props.height : 430);
        let _left = (this.props.left? this.props.left : 590);

        let scroll_height = _height / (this.props.total_page);
        let _top = scroll_height * (this.props.cur_page -1);

        return (
            <div id={css.scroll_bg} style={{height : _height + "px", left : _left + "px"}}>
                <div id={css.scroll_bar} style={{height: scroll_height + "px", top: _top +"px"}}/>
            </div>
        );
    }
}
export default ScrollBar;