var equal = require('assert').equal;
var map = require('../map');


test('#map', function() {
  equal(map('Hello world', function(x) {
    return x;
  }), 'Hello world');
  equal(map(12345, function(x) {
    return x;
  }), '12345');
  equal(map('Hello world', function(x) {
    if (x === 'o') x = 'O';
    return x;
  }), 'HellO wOrld');
  equal(map('', function(x) {
    return x;
  }), '');
  equal(map(null, function(x) {
    return x;
  }), '');
  equal(map(undefined, function(x) {
    return x;
  }), '');
  equal(map('Hello world', ''), 'Hello world');
  equal(map('Hello world', null), 'Hello world');
  equal(map('Hello world', undefined), 'Hello world');
  equal(map('', ''), '');
  equal(map(null, null), '');
  equal(map(undefined, undefined), '');
});
