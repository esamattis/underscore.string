var pad = require('../pad');
var tests = {};

tests['pad default'] = function(){
  pad('foo', 12);
};

tests['pad hash left'] = function(){
  pad('foo', 12, '#');
};

tests['pad hash right'] = function(){
  pad('foo', 12, '#', 'right');
};

tests['pad hash both'] = function(){
  pad('foo', 12, '#', 'both');
};

tests['pad hash both longPad'] = function(){
  pad('foo', 12, 'f00f00f00', 'both');
};

module.exports = {
  tests: tests
};
