var equal = require('assert').equal;
var clean = require('../clean');


test('#clean', function() {
  equal(clean(' foo    bar   '), 'foo bar');
  equal(clean(123), '123');
  equal(clean(''), '', 'claning empty string returns empty string');
  equal(clean(null), '', 'claning null returns empty string');
  equal(clean(undefined), '', 'claning undefined returns empty string');
});
