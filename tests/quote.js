var equal = require('assert').equal;
var quote = require('../quote');
var q = require('../dist/underscore.string').q;


test('#quote', function(){
  equal(quote('foo'), '"foo"');
  equal(quote('"foo"'), '""foo""');
  equal(quote(1), '"1"');
  equal(quote("foo", "'"), "'foo'");

  // alias
  equal(q('foo'), '"foo"');
  equal(q(''), '""');
  equal(q(null), '""');
  equal(q(undefined), '""');
});

