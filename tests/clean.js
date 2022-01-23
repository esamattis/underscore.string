var equal = require('assert').equal;
var clean = require('../clean');


test('#clean', function() {
  equal(clean(' foo    bar   '), 'foo bar');
  equal(clean('foo bar'), 'foo bar', 'cleaning a string not containing multiple spaces returns string itself');
  equal(clean(123), '123', 'cleaning number returns it\'s string representation');
  equal(clean(''), '', 'cleaning empty string returns empty string');
  equal(clean(null), '', 'cleaning null returns empty string');
  equal(clean(undefined), '', 'cleaning undefined returns empty string');
});
