var equal = require('assert').equal;
var deepEqual = require('assert').deepEqual;
var lines = require('../lines');


test('#lines', function() {
  equal(lines('Hello\nWorld').length, 2);
  equal(lines('Hello World').length, 1);
  equal(lines(123).length, 1);
  deepEqual(lines(''), ['']);
  deepEqual(lines(null), []);
  deepEqual(lines(undefined), []);
  deepEqual(lines('Hello\rWorld'), ['Hello\rWorld']);
  deepEqual(lines('Hello\r\nWorld'), ['Hello', 'World']);
});

