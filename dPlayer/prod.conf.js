"use strict"
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //压缩优化css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //优化js
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

const webpackConfig = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: resolve('index.js')
  },
  output: {
    path: resolve('d'),
    filename: "js/[name]-[contenthash:6].js",
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|^(node_modules\/webpack-dev-server\/client))/,
    }]
  },
  plugins: [
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      inject: true
    })
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
}

rm(resolve('d'), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})