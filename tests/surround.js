var equal = require('assert').equal;
var surround = require('../surround');


test('#surround', function() {
  equal(surround('foo', 'ab'), 'abfooab');
  equal(surround(1, 'ab'), 'ab1ab');
  equal(surround(1, 2), '212');
  equal(surround('foo', 1), '1foo1');
  equal(surround('', 1), '11');
  equal(surround(null, 1), '11');
  equal(surround('foo', ''), 'foo');
  equal(surround('foo', null), 'foo');
  equal(surround(undefined, 1), '11');
  equal(surround('foo', undefined), 'foo');
  equal(surround('', ''), '');
  equal(surround(null, null), '');
  equal(surround(undefined, undefined), '');
  equal(surround('foo', '<span>', '</span>'), '<span>foo</span>');
  equal(surround(1, '<span>', '</span>'), '<span>1</span>');
  equal(surround(1, 2, 3), '213');
  equal(surround('foo', 1, 2), '1foo2');
  equal(surround('foo', 1, 0), '1foo0');
  equal(surround('', 1, 2), '12');
  equal(surround(null, 1, 2), '12');
  equal(surround('foo', '', ''), 'foo');
  equal(surround('foo', null, null), 'foo');
  equal(surround('foo', undefined, undefined), 'foo');
  equal(surround('', '', ''), '');
  equal(surround(null, null, null), '');
  equal(surround(undefined, undefined, undefined), '');
});
