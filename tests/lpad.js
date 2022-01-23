var equal = require('assert').equal;
var lpad = require('../lpad');


test('#lpad', function() {
  equal(lpad('1', 8), '       1');
  equal(lpad(1, 8), '       1');
  equal(lpad('1', 8, '0'), '00000001');
  equal(lpad('1', 8, '0', 'left'), '00000001');
  equal(lpad('', 2), '  ');
  equal(lpad(null, 2), '  ');
  equal(lpad(undefined, 2), '  ');
  equal(lpad('Hello', 0), 'Hello');
  equal(lpad('Hello', -8), 'Hello');
  equal(lpad('Hello', undefined), 'Hello');
  equal(lpad('Hello', null), 'Hello');
});
