/**
 * Created by zhengqj on 2017/5/25.
 */
const path = require('path')

const vueConfig = require('./vue-loader.config')

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './client/views/app.js',
        vendor: [
            'vue',
            'vue-router',
            'element-ui'
        ],

    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../dist')
        }
    },
    module: {
        //noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
}