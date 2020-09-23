"use strict"
process.env.NODE_ENV = "production";
const {
  merge
} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //压缩优化css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //优化js
const baseConfig = require("./base.conf");
const utils = require("./utils");
const config = require("../config");

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: false,
      usePostCSS: true
    })
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? {
        safe: true,
        map: {
          inline: false
        }
      } : {
        safe: true
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            // drop_console: true,
            pure_funcs: ['console.log'] //移除console
          }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      })
    ]
  }
})

module.exports = webpackConfig