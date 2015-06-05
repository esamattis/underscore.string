var equal = require('assert').equal;
var rpad = require('../rpad');


test('#rpad', function() {
  equal(rpad('1', 8), '1       ');
  equal(rpad(1, 8), '1       ');
  equal(rpad('1', 8, '0'), '10000000');
  equal(rpad('foo', 8, '0'), 'foo00000');
  equal(rpad('foo', 7, '0'), 'foo0000');
  equal(rpad('', 2), '  ');
  equal(rpad(null, 2), '  ');
  equal(rpad(undefined, 2), '  ');
});

