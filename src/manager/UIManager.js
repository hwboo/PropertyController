"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "../ui/reducers/Reducers";
import Log from "../utils/Log";
import {getComponentName} from "../utils/Util";
import Root from "../ui/Root";
import MainLayer from "../ui/main/layers/MainLayer";
import TestLayer from "../ui/test/layers/TestLayer";
import {addLayer, removeLayer, addView, removeView, setFocusView, addPopup, removePopup} from "../ui/actions/ActionUI";

/**
 * @fileoverview
 * @author hw.boo on 2017-03-10.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
class UIManager {

    /**
     * 생성자
     */
    constructor() {
        this.log_tag = "UIManager";
        this.key_listener = [];
        this.layer_id_offset = 0;
        this.view_id_offset = 0;
        this.popup_id_offset = 0;
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
    }

    /**
     * Start UIManager
     */
    start() {
        Log.printLog(this.log_tag, "called start()");
        window.focus();
        this.store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        this.addLayer(MainLayer);
        this._render();
        document.addEventListener("keydown", this.handleKeyEvent);
    }

    /**
     * Destroy UIManager
     */
    destroy() {
        document.removeEventListener("keydown", this.handleKeyEvent);
    }

    /**
     *
     * @private
     */
    _render() {
        Log.printLog(this.log_tag, "called _render()");
        ReactDOM.render(
            <Provider store={this.store}>
                <Root/>
            </Provider>
            , document.getElementById('root'));
    }

    getLayer(layer_info) {
        Log.printLog(this.log_tag, "called getLayer() - id : " + layer_info.id);
        let layer = React.createElement(
            layer_info.class_info,
            {
                key: layer_info.id,
                id: layer_info.id,
                data: layer_info.data
            },
        );
        return layer;
    }

    addLayer(class_info, data) {
        Log.printLog(this.log_tag, "called addLayer()");
        if (!class_info) {
            return;
        }
        let layer_id = getComponentName(class_info) + "_" + this.layer_id_offset++;
        this.store.dispatch(addLayer(class_info, layer_id, data));
        return layer_id;
    }

    removeLayer(id) {
        Log.printLog(this.log_tag, "called removeLayer()");
        this.store.dispatch(removeLayer(id));
    }

    getView(view_info) {
        Log.printLog(this.log_tag, "called getView() - view_info : " + view_info);
        let view = React.createElement(
            view_info.class_info,
            {
                key: view_info.id,
                id: view_info.id,
                layer_id: view_info.layer_id,
                data: view_info.data,
                callback: view_info.callback,
                is_focus: view_info.is_focus
            },
        );
        return view;
    }

    addView(class_info, layer_id, data, callback, is_focus) {
        Log.printLog(this.log_tag, "called addView()");
        if (!class_info) {
            return;
        }
        let view_id = getComponentName(class_info) + "_" + this.view_id_offset++;
        this.store.dispatch(addView(class_info, layer_id, view_id, data, callback, is_focus));
        return view_id;
    }

    removeView(layer_id, view_id) {
        Log.printLog(this.log_tag, "called addView() - layer_id : " + layer_id + ", view_id : " + view_id);
        this.store.dispatch(removeView(layer_id, view_id));
    }

    setFocusView(layer_id, view_id, is_focus) {
        Log.printLog(this.log_tag, "called setFocusView() - layer_id : " + layer_id + ", view_id : " + view_id + ", is_focus : " + is_focus);
        this.store.dispatch(setFocusView(layer_id, view_id, is_focus));
    }

    getPopup(popup_info) {
        Log.printLog(this.log_tag, "called getPopup() - id : " + popup_info.id);
        let popup = React.createElement(
            popup_info.class_info,
            {
                key: popup_info.id,
                id: popup_info.id,
                layer_id: popup_info.layer_id,
                data: popup_info.data,
                callback: popup_info.callback
            },
        );
        return popup;
    }

    addPopup(class_info, layer_id, data, callback, index) {
        Log.printLog(this.log_tag, "called addPopup()");
        if (!class_info) {
            return;
        }
        let popup_Id = getComponentName(class_info) + "_" + this.popup_id_offset++;
        this.store.dispatch(addPopup(class_info, layer_id, popup_Id, data, callback, index));
        return popup_Id;
    }

    removePopup(layer_id, popup_id) {
        Log.printLog(this.log_tag, "called removePopup() - layer_id : " + layer_id + ", popup_id : " + popup_id);
        this.store.dispatch(removePopup(layer_id, popup_id));
    }

    addKeyListener(id, listener) {
        Log.printLog(this.log_tag, "called addKeyListener() - id : " + id);
        if (!this.key_listener[id]) {
            this.key_listener[id] = listener;
        }
        if (!this.key_listener.includes(listener)) {
            this.key_listener.push(listener);
        }
    }

    removeKeyListener(id) {
        Log.printLog(this.log_tag, "called removeKeyListener() - id : " + id);
        if (this.key_listener[id]) {
            delete this.key_listener[id];
        }
    }

    handleKeyEvent(event) {
        Log.printLog(this.log_tag, "called handleKeyEvent()");
        let layers = this.store.getState().ReducerUI;
        if (!layers || layers.length <= 0) {
            Log.printLog(this.log_tag, "handleKeyEvent() - return invalid layers");
            return;
        }
        for (let i = layers.length - 1; i >= 0; i--) {
            let layer = layers[i];
            //popup 키 전달
            if (layer.popups && layer.popups.length > 0) {
                for (let j = layer.popups.length - 1; j >= 0; j--) {
                    if (this.key_listener[layer.popups[j].id](event)) {
                        return;
                    }
                }
            }

            //VIew 키 전달
            if (Object.keys(layer.views).length > 0) {
                for (let j in layer.views) {
                    if (layer.views[j].is_focus && this.key_listener[layer.views[j].id](event)) {
                        return;
                    }
                }
            }

            //layer 키 전달
            if (this.key_listener[layer.id](event)) {
                return;
            }
        }
    }
}


let uiManager = new UIManager();
//TODO [hw.boo] 테스트
window.UIManager = uiManager;
export default uiManager