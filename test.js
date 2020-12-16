var pug = require('pug');

// Compile a function
var fn = pug.compileClient('- var lang = require("./gt.js") \nstring of pug#{lang.name}', {debug: true, test: 11111, self: true, globals:['require']});

console.log(fn);