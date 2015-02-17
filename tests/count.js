var equal = require('assert').equal;
var count = require('../count');


test('#count', function(){
  equal(count('Hello world', 'l'), 3);
  equal(count('Hello world', 'Hello'), 1);
  equal(count('Hello world', 'foo'), 0);
  equal(count('x.xx....x.x', 'x'), 5);
  equal(count('', 'x'), 0);
  equal(count(null, 'x'), 0);
  equal(count(undefined, 'x'), 0);
  equal(count(12345, 1), 1);
  equal(count(11345, 1), 2);
  equal(count('Hello World', ''), 0);
  equal(count('Hello World', null), 0);
  equal(count('Hello World', undefined), 0);
  equal(count('', ''), 0);
  equal(count(null, null), 0);
  equal(count(undefined, undefined), 0);
});

