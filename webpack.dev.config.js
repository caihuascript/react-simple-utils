var webpack = require("webpack");
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'main.bundle.js'
    },
    devServer: {
        filename: 'main.bundle.js',
        host: '0.0.0.0',
        port: 8000
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
            }
        },{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    plugins: [
        new CaseSensitivePathsPlugin() //检查引用文件名字的大小写
    ]
} 