"user strict"
const fs = require("fs");
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const pkg = require("../package.json");
const Handlebars = require('handlebars');
const posthtml = require('posthtml');
const include = require('posthtml-include');
const glob = require('glob');
const WebpackHtmlPluginSupplement = require('webpack-html-plugin-supplement') //修改webpack-html-plugin public-path

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '../'),
  entry: {
    // zq: utils.entryFile(),
    app: resolve('src/app.js'),
    ...utils.globFile().entry
  },
  output: {
    path: config.build.assetsRoot,
    filename: process.env.NODE_ENV === 'production' ? "js/[name]-[contenthash:6].js" : "js/[name].js",
    publicPath: '/'
    // libraryExport: 'zq',
    // library: "$zq", //插件的名字
    // libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      "@": resolve(config.base.packagesRoot),
      "src": resolve("src"),
      "tools": resolve("tools")
    }
  },
  module: {
    rules: [{
        test: /\.pug$/,
        loader: 'pug-loader',
        query: {
          globals: ['require']
        }

      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|^(node_modules\/webpack-dev-server\/client))/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('/img/[name].[hash:7].[ext]'),
          esModule: false,
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
  },
  plugins: [
    ...utils.globFile().html,
    new WebpackHtmlPluginSupplement({
      publicPath: (src, name) => {
        // console.log(src, name)
        src = src.indexOf('/') == 0 ? src : '/' + src;
        return ['index', 'categories', 'video', 'tools', 'my'].indexOf(name) != -1 ? '.' + src : '..' + src;
      }
    })
  ]
}