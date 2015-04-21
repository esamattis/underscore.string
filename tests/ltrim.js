var equal = require('assert').equal;
var ltrim = require('../ltrim');

test('#ltrim', function() {
  equal(ltrim(' foo'), 'foo');
  equal(ltrim('    foo'), 'foo');
  equal(ltrim('foo '), 'foo ');
  equal(ltrim(' foo '), 'foo ');
  equal(ltrim(''), '', 'ltrim empty string should return empty string');
  equal(ltrim(null), '', 'ltrim null should return empty string');
  equal(ltrim(undefined), '', 'ltrim undefined should return empty string');

  equal(ltrim('ffoo', 'f'), 'oo');
  equal(ltrim('ooff', 'f'), 'ooff');
  equal(ltrim('ffooff', 'f'), 'ooff');

  equal(ltrim('_-foobar-_', '_-'), 'foobar-_');

  equal(ltrim(123, 1), '23');
});

