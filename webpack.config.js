const PACKAGE = require('./package.json');
const version = PACKAGE.version;
const path = require('path');
const argv = require('yargs').argv;
const env = argv.env;
const publicPath = argv.publicPath;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let plugins = [];
let cleanPlugin = new CleanWebpackPlugin();
plugins.push(cleanPlugin);

let htmlPlugin = new HtmlWebpackPlugin({
    template: 'index.html',
    alwaysWriteToDisk: true
});
plugins.push(htmlPlugin);
let minCss = new MiniCssExtractPlugin({
    // 类似 webpackOptions.output里面的配置 可以忽略
    filename: '[name].css',
    chunkFilename: '[id].css',
});
plugins.push(minCss);

let zipPlugin = new ZipPlugin({
    path: path.resolve(__dirname, 'zip'),
    filename: `editor-${env}.zip`
})
plugins.push(zipPlugin);
plugins.push(new VueLoaderPlugin())

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: publicPath,
        filename: `coreEditor-${version}.js`,
        chunkFilename:'js/[name]-.js'
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets:['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [/node_modules/, require.resolve('./index.html')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'images/'
                }
            },
        ]
    },
    devServer: {
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        index: 'index.html'
    },
    resolve: {
        alias: {}
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({})],
    },
    // devtool: "none",
    mode: 'development'
};
