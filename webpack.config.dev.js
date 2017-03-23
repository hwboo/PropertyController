"use strict";

/**
 * @fileoverview 개발용 webpack configuration
 * @author hw.boo on 2017-02-17.
 * @version
 * <p>Copyright (c) 1997-2015 Alticast, Inc. All rights reserved.
 */
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [__dirname + '/src/index.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + "/build",
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//변경 사항 즉시 반영 플러그인
        new htmlWebpackPlugin({template: './src/index.html'}),//HTML 파일 생성 플러그인
        new webpack.BannerPlugin("Copyright (c) 1997-2017 Alticast, Inc. All rights reserved."),//상단 배너 플러그인
    ],
    module: {
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader?modules"},//모듈 단위 스타일시트 로더
        ]
    }
};