"use strict";
import React, {Component} from "react";
import {connect} from 'react-redux';
import UIManager from '../manager/UIManager';

/**
 * @fileoverview
 * @author hw.boo on 2017-03-17.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class Root extends Component {
    render() {
        let layers = this.props.layers;
        let components = [];
        for (let i = 0; i < layers.length; i++) {
            //Layer
            let layer = layers[i];
            if (!layer) {
                continue;
            }
            components.push(UIManager.getLayer(layer));
            //View
            if (layer.views) {
                for (let j in layer.views) {
                    components.push(UIManager.getView(layer.views[j]));
                }
            }
            //Popup
            if (layer.popups && layer.popups.length) {
                for (let j = 0; j < layer.popups.length; j++) {
                    components.push(UIManager.getPopup(layer.popups[j]));
                }
            }
        }
        if (!components || components.length <= 0) {
            return null;
        }
        return (
            <div>
                {components}
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        layers: state.ReducerUI
    };
};
export default connect(mapStateToProps)(Root);