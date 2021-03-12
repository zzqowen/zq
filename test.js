var pug = require('pug');

// Compile a function
var fn = pug.compileClient('- var lang = require("./gt.js") \nstring of pug#{lang.name}', {debug: true, test: 11111, self: true, globals:['require']});

console.log(fn);

wget  http://mirror.centos.org/centos/7.9.2009/os/x86_64/Packages/python-libs-2.7.5-89.el7.x86_64.rpm