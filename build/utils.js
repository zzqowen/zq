"use strict"
const fs = require("fs");
const path = require("path");
const config = require("../config");
const pkg = require("../package.json");

const pakDirectory = path.join(__dirname, `../${config.base.packagesRoot}`);

let type = process.env.npm_config_type; //打包文件的类型，默认所有

console.log(pakDirectory);

// console.log(process.env)

module.exports = {
  entryFile: () => {
    if (!!type) var p = path.join(pakDirectory, type, 'index.js');
    if (!!type && fs.existsSync(p)) {
      return p;
    } else {
      return path.join(__dirname, `../${pkg.main}`);
    }
  }
}