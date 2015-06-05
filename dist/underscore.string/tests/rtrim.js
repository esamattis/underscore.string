var equal = require('assert').equal;
var rtrim = require('../rtrim');

test('#rtrim', function() {
  equal(rtrim('http://foo/', '/'), 'http://foo', 'clean trailing slash');
  equal(rtrim(' foo'), ' foo');
  equal(rtrim('foo '), 'foo');
  equal(rtrim('foo     '), 'foo');
  equal(rtrim('foo  bar     '), 'foo  bar');
  equal(rtrim(' foo '), ' foo');

  equal(rtrim('ffoo', 'f'), 'ffoo');
  equal(rtrim('ooff', 'f'), 'oo');
  equal(rtrim('ffooff', 'f'), 'ffoo');

  equal(rtrim('_-foobar-_', '_-'), '_-foobar');

  equal(rtrim(123, 3), '12');
  equal(rtrim(''), '', 'rtrim empty string should return empty string');
  equal(rtrim(null), '', 'rtrim null should return empty string');
});

