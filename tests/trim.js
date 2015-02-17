var trim = require('../trim');
var equal = require('assert').equal;

test('#trim', function() {
  equal(trim(123), '123', 'Non string');
  equal(trim(' foo'), 'foo');
  equal(trim('foo '), 'foo');
  equal(trim(' foo '), 'foo');
  equal(trim('    foo     '), 'foo');
  equal(trim('    foo     '), 'foo', 'Manually set whitespace');
  equal(trim('\t    foo \t  '), 'foo', 'Manually set RegExp /\\s+/');

  equal(trim('ffoo', 'ff'), 'oo');
  equal(trim('ooff', 'ff'), 'oo');
  equal(trim('ffooff', 'ff'), 'oo');


  equal(trim('_-foobar-_', '_-'), 'foobar');

  equal(trim('http://foo/', '/'), 'http://foo');
  equal(trim('c:\\', '\\'), 'c:');

  equal(trim(123), '123');
  equal(trim(123, 3), '12');
  equal(trim(''), '', 'Trim empty string should return empty string');
  equal(trim(null), '', 'Trim null should return empty string');
  equal(trim(undefined), '', 'Trim undefined should return empty string');
});

