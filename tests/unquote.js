var equal = require('assert').equal;
var unquote = require('../unquote');

test('#unquote', function(){
  equal(unquote('"foo"'), 'foo');
  equal(unquote('""foo""'), '"foo"');
  equal(unquote('"1"'), '1');
  equal(unquote("'foo'", "'"), 'foo');
  equal(unquote(''), '', 'unquote empty string');
  equal(unquote(null), '', 'unquote null');
  equal(unquote(undefined), '', 'unqote undefined');
});

