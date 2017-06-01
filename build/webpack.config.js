/**
 * Created by zhengqj on 2017/5/25.
 */
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const config = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'

        }),
        //extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //generate output HTML
        new HTMLPlugin({
            template: 'client/views/index.html',
            chunks: ['vendor', 'app']
        })

    ]
})

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    )
}


module.exports = config;