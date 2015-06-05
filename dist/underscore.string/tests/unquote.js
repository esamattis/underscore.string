var equal = require('assert').equal;
var unquote = require('../unquote');


test('#unquote', function(){
  equal(unquote('"foo"'), 'foo');
  equal(unquote('""foo""'), '"foo"');
  equal(unquote('"1"'), '1');
  equal(unquote("'foo'", "'"), 'foo');
});

