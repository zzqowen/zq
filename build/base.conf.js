"user strict"
const path = require("path");
const utils = require("./utils");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
console.log('入口文件', utils.entryFile());
module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '../'),
  entry: {
    zq: utils.entryFile()
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: config.build.assetsPublicPath
  },
  resolve: {
    alias: {
      "@": resolve(config.base.packagesRoot)
    }
  }
}