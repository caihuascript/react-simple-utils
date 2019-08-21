var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: "index.js"
        
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            use:{
                loader: 'file-loader'
            }
        }]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    }
} 