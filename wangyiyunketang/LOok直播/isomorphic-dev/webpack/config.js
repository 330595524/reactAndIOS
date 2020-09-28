/* eslint-disable */
const fs = require('fs');
const path = require('path');
const MiniCssPlugin = require('mini-css-extract-plugin');
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// client config
const client = {
    name: 'client',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr',
            path.resolve(__dirname, '../client/app.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '/public/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'],
        symlinks: false  // npm link
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        caller: {
                            target: 'web'
                        }
                    }
                }]
            },
            {
                test: /\.(css|less)?$/,
                use: [
                    {
                        loader: MiniCssPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|cur)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2560,
                        name: '[path][name].[ext]?[hash]'
                    }
                }]
            },
            {
                test: /\.(html)?$/,
                use: [{
                    loader: 'handlebars-loader',
                    options: {
                        minimize: false
                    }
                }]
            }
        ]
    }
};
// sever config
const server = {
    name: 'server',
    target: 'node',
    node: {
        __filename: false,
        __dirname: false
    },
    output: {
        path: path.resolve(__dirname, '../buildserver'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        symlinks: false
    },
    externals: ['@loadable/component', nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        caller: {
                            target: 'node'
                        }
                    }
                }]
            },
            {
                test: /\.(css|less|png|jpg|gif|svg|cur)$/,
                loader: 'ignore-loader',
            }
        ]
    }
};
const totalConfig = {
    client: client,
    server: server
}
module.exports = totalConfig;