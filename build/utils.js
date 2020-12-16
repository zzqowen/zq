"use strict"
const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require("../config");
const pkg = require("../package.json");
const chalk = require("chalk");

const pakDirectory = path.join(__dirname, `../${config.base.packagesRoot}`);

let type = process.env.npm_config_type; //打包文件的类型，默认所有

console.log(pakDirectory, type);


const cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders);
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders("less")
  }
}

module.exports = {
  entryFile: () => {
    if (!!type) var p = path.join(pakDirectory, type, 'index.js');
    if (!!type && fs.existsSync(p)) {
      return p;
    } else {
      return path.join(__dirname, `../${pkg.main}`);
    }
  },
  getFileName: function (url) {
    return url.split('/').pop().split('#')[0].split('?')[0];
  },
  assetsPath: (_path) => {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
      config.build.assetsSubDirectory :
      config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
  },
  styleLoaders: (options) => {
    const output = []
    const loaders = cssLoaders(options)

    for (const extension in loaders) {
      const loader = loaders[extension]
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        use: loader
      })
    }
    return output
  },
  createNotifierCallback: () => {
    const notifier = require('node-notifier')

    // return notifier.notify('Message');

    return (severity, errors) => {
      if (severity !== 'error') return

      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
      console.log(chalk.red(error.webpackError))
      // notifier.notify({
      //   title: 'pkg.name',
      //   message: severity 
      // })
    }

  }
}