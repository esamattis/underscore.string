var equal = require('assert').equal;
var deepEqual = require('assert').deepEqual;
var lines = require('../lines');


test('#lines', function() {
  equal(lines('Hello\nWorld').length, 2);
  equal(lines('Hello\rWorld').length, 2);
  equal(lines('Hello World').length, 1);
  equal(lines('\r\n\n\r').length, 4);
  equal(lines('Hello\r\r\nWorld').length, 3);
  equal(lines('Hello\r\rWorld').length, 3);
  equal(lines(123).length, 1);
  deepEqual(lines(''), ['']);
  deepEqual(lines(null), []);
  deepEqual(lines(undefined), []);
  deepEqual(lines('Hello\rWorld'), ['Hello', 'World']);
  deepEqual(lines('Hello\r\nWorld'), ['Hello', 'World']);
});

