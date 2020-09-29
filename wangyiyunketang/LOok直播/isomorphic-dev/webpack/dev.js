const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const common = require('./config.js');

module.exports = [
    merge(common.client, {
        mode: 'development',
        plugins: [
            // filename为绝对路径时以output.path为基准
            // template以执行路径为基准
            new HtmlWebpackPlugin({
                filename: '../html/dev/index.html',
                template: './html/tpl/index.html',
                inject: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            }),
            new MiniCssPlugin({
                filename: '[name].css',
                chunkFilename: '[name].css'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new WriteFilePlugin({
                test: /\.html$/
            }),
            new LoadablePlugin()
        ]
    }),
    merge(common.server, {
        mode: 'development',
        entry: {
            server: path.resolve(__dirname, '../server/route.js') 
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),
            new WriteFilePlugin(),
            new LoadablePlugin()
        ]
    })
];