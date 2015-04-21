var equal = require('assert').equal;
var join = require('../join');


test('#join', function() {
  equal(join('', 'foo', 'bar'), 'foobar', 'basic join');
  equal(join('', 1, 'foo', 2), '1foo2', 'join numbers and strings');
  equal(join(' ','foo', 'bar'), 'foo bar', 'join with spaces');
  equal(join('1', '2', '2'), '212', 'join number strings');
  equal(join(1, 2, 2), '212', 'join numbers');
  equal(join('','foo', null), 'foo', 'join null with string returns string');
  equal(join(null,'foo', 'bar'), 'foobar', 'join strings with null returns string');
  equal(join(1, 2, 3, 4), '21314');
  equal(join('|', 'foo', 'bar', 'baz'), 'foo|bar|baz');
  equal(join('',2,3,null), '23');
  equal(join(null,2,3), '23');
});

