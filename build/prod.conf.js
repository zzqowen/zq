"use strict"
const {
  merge
} = require('webpack-merge');
const baseConfig = require("./base.conf");

process.env.NODE_ENV = "production";

const webpackConfig = merge(baseConfig, {})

module.exports = webpackConfig