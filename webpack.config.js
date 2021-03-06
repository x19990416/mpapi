'use strict';

const webpack = require('webpack');
const path = require('path');
const moment = require('moment');

const packageJSON = require('./package.json');

const getConfig = function (outputPath) {
    let config = {
        entry: path.join(__dirname, 'src/index.js'),
        output: {
            path: outputPath,
            filename: 'mpapi.js',
            library: '$api',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0']
                }
            }]
        },
        plugins: [
            new webpack.BannerPlugin(
`${packageJSON.name}
version: ${packageJSON.version}
address: ${packageJSON.homepage}
description: ${packageJSON.description}
updateDate: ${moment().format('YYYY-MM-DD')}
author:  ${packageJSON.author}
license: ${packageJSON.license}`)
        ],
        resolve: {
            extensions: ['.js']
        }
    }

    return config
}

module.exports = [
  getConfig(path.join(__dirname, 'lib')),
]