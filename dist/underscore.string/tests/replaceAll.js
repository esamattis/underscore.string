var equal = require('assert').equal;
var replaceAll = require('../replaceAll');


test('#replaceAll', function(){
  equal(replaceAll('a', 'a', 'b'), 'b');
  equal(replaceAll('aa', 'a', 'b'), 'bb');
  equal(replaceAll('aca', 'a', 'b'), 'bcb');
  equal(replaceAll('ccc', 'a', 'b'), 'ccc');
  equal(replaceAll('AAa', 'a', 'b'), 'AAb');
  equal(replaceAll('Aa', 'a', 'b', true), 'bb');
  equal(replaceAll('foo bar foo', 'foo', 'moo'), 'moo bar moo');
  equal(replaceAll('foo bar\n foo', 'foo', 'moo'), 'moo bar\n moo');
  equal(replaceAll('foo bar FoO', 'foo', 'moo', true), 'moo bar moo');
  equal(replaceAll('', 'a', 'b'), '');
  equal(replaceAll(null, 'a', 'b'), '');
  equal(replaceAll(undefined, 'a', 'b'), '');
  equal(replaceAll(12345, 'a', 'b'), 12345);
});

