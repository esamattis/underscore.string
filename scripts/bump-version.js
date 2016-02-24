var replace = require('replace');
var package = require('../package.json');
var VERSION_FILES = ['./component.json', './bower.json', './index.js', './package.js'];
 
replace({
  regex: /(version?\s?=?\:?\s\')([\d\.]*)\'/gi,
  replacement: '$1' + package.version + "'",
  paths: VERSION_FILES,
  recursive: false,
  silent: false
});

replace({
  regex: /(version?"\s?:?\:?\s")([\d\.]*)"/gi,
  replacement: '$1' + package.version + "\"",
  paths: VERSION_FILES,
  recursive: false,
  silent: false
});
