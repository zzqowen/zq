"user strict"
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const pkg = require("../package.json");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '../'),
  entry: {
    zq: utils.entryFile()
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: config.build.assetsPublicPath,
    libraryExport: 'default',
    library: "$zq", //插件的名字
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      "@": resolve(config.base.packagesRoot),
      "tools": resolve("tools")
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
         exclude: /(node_modules|^(node_modules\/webpack-dev-server\/client))/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          publicPath: function (url) {
            return process.env.NODE_ENV === 'production' ? url.replace('static', '../') : url
          }
        }
      }
    ]
  }
}