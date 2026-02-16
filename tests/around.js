var equal = require('assert').equal;
var around = require('../around');


test('#around', function() {
  equal(around('This is an apple', 'apple', '[', ']'), 'This is an [apple]');
  equal(around('This is an apple', 'a', '[', ']'), 'This is [a]n [a]pple');
  equal(around('This is an apple', 'x', '[', ']'), 'This is an apple');
  equal(around(12345, 3, 101, 101), '12101310145');
  equal(around('This is an apple', 'apple', '[', ''), 'This is an [apple');
  equal(around('This is an apple', 'apple', 1, ''), 'This is an 1apple');
  equal(around('This is an apple', 'apple', '[', 0), 'This is an [apple0');
  equal(around('This is an apple', 'apple', '[', 1), 'This is an [apple1');
  equal(around('This is an apple', 'apple', '[', null), 'This is an [apple[');
  equal(around('This is an apple', 'apple', '[', undefined), 'This is an [apple[');
  equal(around('', 'apple', '[', ']'), '');
  equal(around('This is an apple', '', '[', ']'), 'This is an apple');
  equal(around('This is an apple', 'apple', '', ']'), 'This is an apple]');
  equal(around('This is an apple', 'apple', '', ''), 'This is an apple');
  equal(around('This is an apple', 'apple', null, null), 'This is an apple');
  equal(around('This is an apple', 'apple', undefined, undefined), 'This is an apple');
  equal(around(null, 'apple', '[', ']'), '');
  equal(around('This is an apple', null, '[', ']'), 'This is an apple');
  equal(around('This is an apple', 'apple', null, ']'), 'This is an apple]');
  equal(around(undefined, 'apple', '[', ']'), '');
  equal(around('This is an apple', undefined, '[', ']'), 'This is an apple');
  equal(around('This is an apple', 'apple', undefined, ']'), 'This is an apple]');
  equal(around('', '', '', ''), '');
  equal(around(null, null, null, null), '');
  equal(around(undefined, undefined, undefined, undefined), '');
});
