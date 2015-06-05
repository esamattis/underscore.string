var equal = require('assert').equal;
var surround = require('../surround');


test('#surround', function(){
  equal(surround('foo', 'ab'), 'abfooab');
  equal(surround(1, 'ab'), 'ab1ab');
  equal(surround(1, 2), '212');
  equal(surround('foo', 1), '1foo1');
  equal(surround('', 1), '11');
  equal(surround(null, 1), '11');
  equal(surround('foo', ''), 'foo');
  equal(surround('foo', null), 'foo');
});

