var equal = require('assert').equal;
var repeat = require('../repeat');


test('#repeat', function() {
  equal(repeat('foo'), '');
  equal(repeat('foo', 3), 'foofoofoo');
  equal(repeat('foo', '3'), 'foofoofoo');
  equal(repeat(123, 2), '123123');
  equal(repeat(1234, 2, '*'), '1234*1234');
  equal(repeat(1234, 2, 5), '123451234');
  equal(repeat('', 2), '');
  equal(repeat(null, 2), '');
  equal(repeat(undefined, 2), '');
});

