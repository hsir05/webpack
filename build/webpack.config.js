const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.argv.indexOf('--mode=production') === -1;
module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../dist/css/",
                        hmr: devMode
                    }
                }, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../dist/css/",
                        hmr: devMode
                    }
                }, 'css-loader', 'less-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.(jep?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            ' @': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        // new vueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })
    ]
}



// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const Webpack = require('webpack');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// module.exports = {
//     mode: 'development', // 开发模式
   
//     // 生成 source-map，用于打断点，这里有好几个选项
//     devtool: '#cheap-module-eval-source-map',
//     entry: {
//         main: ["@babel/polyfill", path.resolve(__dirname, '../src/main.js')],
//         header: ["@babel/polyfill", path.resolve(__dirname, '../src/header.js')]
//     },
//     output: {
//         filename: '[name].[hash:8].js',      // 打包后的文件名称
//         path: path.resolve(__dirname, '../dist')  // 打包后的目录
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 },
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.css$/,
//                 use: ['css-loader', {
//                     loader: 'postcss-loader',
//                     options: {
//                         plugins: [require('autoprefixer')]
//                     }
//                 }]
//             },
//             {
//                 test: /\.scss$/,
//                 use: ['css-loader', {
//                     loader: 'postcss-loader',
//                     options: {
//                         plugins: [require('autoprefixer')]
//                     }
//                 }, 'scss-loader']
//             },
//             {
//                 test: /\.(jpe?g|png|gif)$/i, //图片文件
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10240,
//                             fallback: {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'img/[name].[hash:8].[ext]'
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10240,
//                             fallback: {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'media/[name].[hash:8].[ext]'
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
//                 use: [
//                     {
//                         loader: 'url-loader',
//                         options: {
//                             limit: 10240,
//                             fallback: {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'fonts/[name].[hash:8].[ext]'
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },
//         ]
//     },
//     // resolve: {
//     //     // 文件扩展名，写明以后就不需要每个文件写后缀
//     //     extensions: ['.js', '.css', '.json'],
//     //     // 路径别名，比如这里可以使用 css 指向 static/css 路径
//     //     alias: {
//     //         '@': resolve('src'),
//     //         'css': resolve('static/css')
//     //     }
//     // },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/index.html'),
//             filename: 'index.html',
//             chunks: ['main'] // 与入口文件对应的模块名
//         }),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../public/header.html'),
//             filename: 'header.html',
//             chunks: ['header'] // 与入口文件对应的模块名
//         }),
//         new CleanWebpackPlugin(),
//         // new CleanWebpackPlugin(['dist/*.js'], {
//         //     verbose: true,
//         //     dry: false
//         // }),
//         new MiniCssExtractPlugin({
//             filename: "[name].[hash].css",
//             chunkFilename: "[id].css",
//         }),
//         new Webpack.HotModuleReplacementPlugin(),
//         // 分离 CSS 代码
//         new ExtractTextPlugin("css/[name].[contenthash].css"),
//         // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
//         new OptimizeCSSPlugin({
//             cssProcessorOptions: {
//                 safe: true
//             }
//         }),
//     ],
//     devServer: {
//         port: 3000,
//         hot: true,
//         contentBase: '../dist'
//     },
// }
