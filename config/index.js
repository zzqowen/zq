"use strict"
const path = require("path");
const chalk = require("chalk");
const address = require('address')
const defaultGateway = require('default-gateway')

const getHost = function () {
  let host = 'localhost';
  try {
    const result = defaultGateway.v4.sync()
    host = address.ip(result && result.interface)
  } catch (_e) {
    console.log('host获取错误', _e)
  }
  return host
}

const distRoot = "dist";

module.exports = {
  base: {
    packagesRoot: 'packages',
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://oa.aixunmiao.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    },

    host: getHost(), // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: false
  },
  build: {
    index: path.resolve(__dirname, `../${distRoot}/index.html`),
    assetsRoot: path.resolve(__dirname, `../${distRoot}`),
    assetsSubDirectory: './static',
    assetsPublicPath: './',
  }
}