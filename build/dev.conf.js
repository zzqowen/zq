"use strict"
process.env.NODE_ENV = "development";
const path = require("path");
const {
  merge
} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require("portfinder");
const webpack = require("webpack");
const glob = require('glob');
const utils = require("./utils");
const config = require("../config");
const baseConfig = require("./base.conf");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var allPug = glob.sync('./src/pages/**/*.pug');

console.log('额外', resolve('src/pages/index/index.pug'))

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, "index.html")
      }, ],
    },
    hot: false,
    contentBase: path.join(__dirname, '../dist'), // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/pages/index/index.pug'),
      chunks: ['app', 'index'],
      inject: true,
      title: '拉上了罚款就'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'my.html',
    //   template: resolve('src/pages/my/my.pug'),
    //   chunks: ['app', 'my'],
    //   inject: true,
    //   title: '拉上了罚款就'
    // })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      webpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      webpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(webpackConfig)
    }
  })
})