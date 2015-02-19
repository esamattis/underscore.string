var s = require('../');
var tests = {};

tests['trimNoNative'] = function() {
  return s.trim("  foobar  ", " ");
};

tests['trim'] = function() {
  return s.trim("  foobar  ");
};

tests['trim object-oriented'] = function() {
  return s("  foobar  ").trim().value();
};

module.exports = {
  tests: tests
};
