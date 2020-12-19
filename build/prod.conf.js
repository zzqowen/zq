"use strict"
process.env.NODE_ENV = "production";
const {
  merge
} = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //压缩优化css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //优化js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./base.conf");
const utils = require("./utils");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
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
    }),
    ...utils.globFile().html,
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true,
          mangle: {
            properties: false
          },
          warnings: false,
          compress: {
            // drop_console: true,
            pure_funcs: ['console.log'] //移除console
          },
          output: {
            comments: false,
          },
        },
        sourceMap: config.build.productionSourceMap,
        // parallel: true
      })
    ]
  }
})

module.exports = webpackConfig