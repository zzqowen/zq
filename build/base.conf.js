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

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var allPug = glob.sync('./src/pages/**/*.pug')

console.log(allPug, '了空间啊', utils.getFileName(allPug[0]))
var entryJS = {
  zq: utils.entryFile()
};

allPug.forEach((item) => {
  console.log(item)
  var name = utils.getFileName(item);
  var jsPath = item.replace('.pug', '.js');
  console.log(name.split('.')[0])
  if (fs.existsSync(jsPath)) {
    entryJS[name.split('.')[0]] = jsPath;
  }
})

console.log(entryJS);


module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '../'),
  entry: entryJS,
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: config.build.assetsPublicPath,
    libraryExport: 'zq',
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
        test: /\.pug$/,
        loader: 'pug-loader',
        query: {
          globals: ['require']
        }

      }, {
        test: /\.html$/i,
        loaders: [{
          loader: 'html-loader',
          options: {
            esModule: true,
            preprocessor: (content, loaderContext) => {
              let result;
              try {
                result = posthtml().use(include({
                  encoding: 'utf8'
                })).process(content, {
                  sync: true
                });
              } catch (error) {
                loaderContext.emitError(error);

                return content;
              }
              // console.log(result.html);
              return result.html;
            },
          },
        }]
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|^(node_modules\/webpack-dev-server\/client))/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
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