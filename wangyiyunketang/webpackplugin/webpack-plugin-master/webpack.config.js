const path = require('path');
const MyPlugin = require('./plugins/MyPlugin');
const FileListPlugin = require('./plugins/FileListPlugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MyPlugin(),
        new FileListPlugin({
            filename: '_filelist.md'
        })
    ]
}