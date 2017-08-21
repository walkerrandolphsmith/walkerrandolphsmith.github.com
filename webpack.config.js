var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'docs');
var mainPath = path.resolve(__dirname, 'src', 'app', 'index.js');
var postPath = path.resolve(__dirname, 'src', 'app', 'post.js');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: mainPath,
        post: postPath
    },
    output: { filename: buildPath + "/[name].js" },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: [nodeModulesPath] }
        ]
    }
};