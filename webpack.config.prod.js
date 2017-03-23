"use strict";

/**
 * @fileoverview 배포용 webpack configuration
 * @author hw.boo on 2017-02-17.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [__dirname + '/src/index.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),//최적화 플러그인
        new webpack.optimize.UglifyJsPlugin(),//최적화 플러그인
        new htmlWebpackPlugin({template: './src/index.html'}),//HTML 파일 생성 플러그인
    ],
    module: {
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader?modules"},//모듈 단위 스타일시트 로더
        ]
    }
};