var naturalCmp = require('../naturalCmp');
var _ = require('underscore');
var equal = require('assert').equal;

test("#naturalCmp", function() {
  // Should be associative
  _.each([
    ['abc', null],
    ['abc', '123'],
    ['def', 'abc'],
    ['ab', 'a'],
    ['r69', 'r9'],
    ['123', '122'],
    ['ac2', 'ab3'],
    ['a-12', 'a-11'],
    ['11', '-12'],
    ['15.05', '15'],
    ['15ac', '15ab32'],
    ['16', '15ab'],
    ['15a123', '15a122'],
    ['15ab16', '15ab'],
    ['abc', 'Abc'],
    ['abc', 'aBc'],
    ['aBc', 'Abc']
  ], function(vals) {
    var a = vals[0], b = vals[1];
    equal(naturalCmp(a, b), 1, '\'' + a + '\' >= \'' + b + '\'');
    equal(naturalCmp(b, a), -1, '\'' + b + '\' <= \'' + a + '\'');
  });
  _.each([
    ['123', '123'],
    ['abc', 'abc'],
    ['r12', 'r12'],
    ['12a', '12a']
  ], function(vals) {
    var a = vals[0], b = vals[1];
    equal(naturalCmp(a, b), 0, '\'' + a + '\' == \'' + b + '\'');
    equal(naturalCmp(b, a), 0, '\'' + b + '\' == \'' + a + '\'');
  });
});
