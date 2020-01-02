const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack')
// let indexScss = new ExtractTextWebpackPlugin('index.scss');
// let indexCss = new ExtractTextWebpackPlugin('index.css');

module.exports = {
    mode: 'development', // 开发模式
    entry: {
        main: path.resolve(__dirname, '../src/main.js'),
        header: path.resolve(__dirname, '../src/header.js')
    },
    output: {
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname, '../dist')  // 打包后的目录
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }, 'scss-loader']
            }

            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'] // 从右向左解析原则
            // },
            // {
            //     test: /\.scss$/,
            //     use: [
            //             MiniCssExtractPlugin.loader,
            //             'style-loader', 'css-loader', {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: [require('autoprefixer')]
            //             }
            //         }, 'scss-loader'
            //     ] // 从右向左解析原则
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            chunks: ['main'] // 与入口文件对应的模块名
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/header.html'),
            filename: 'header.html',
            chunks: ['header'] // 与入口文件对应的模块名
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
}
