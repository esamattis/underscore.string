var ok = require('assert').ok;
var strictEqual = require('assert').strictEqual;
var startsWith = require('../startsWith');


test('#startsWith', function() {
  ok(startsWith('foobar', 'foo'), 'foobar starts with foo');
  ok(!startsWith('oobar', 'foo'), 'oobar does not start with foo');
  ok(startsWith('oobar', 'o'), 'oobar starts with o');
  ok(startsWith(12345, 123), '12345 starts with 123');
  ok(!startsWith(2345, 123), '2345 does not start with 123');
  ok(startsWith('', ''), 'empty string starts with empty string');
  ok(startsWith(null, ''), 'null starts with empty string');
  ok(!startsWith(null, 'foo'), 'null starts with foo');
  ok(startsWith('-foobar', 'foo', 1), 'foobar starts with foo at position 1');
  ok(startsWith('foobar', 'foo', 0), 'foobar starts with foo at position 0');
  ok(!startsWith('foobar', 'foo', 1), 'foobar starts not with foo at position 1');
  ok(startsWith('Äpfel', 'Ä'), 'string starts with a unicode');

  strictEqual(startsWith('hello', 'hell'), true);
  strictEqual(startsWith('HELLO', 'HELL'), true);
  strictEqual(startsWith('HELLO', 'hell'), false);
  strictEqual(startsWith('HELLO', 'hell'), false);
  strictEqual(startsWith('hello', 'hell', 0), true);
  strictEqual(startsWith('HELLO', 'HELL', 0), true);
  strictEqual(startsWith('HELLO', 'hell', 0), false);
  strictEqual(startsWith('HELLO', 'hell', 0), false);
  strictEqual(startsWith('HELLO'), false);
  strictEqual(startsWith('undefined'), true);
  strictEqual(startsWith('null', null), true);
  strictEqual(startsWith('hello', 'hell', -20), true);
  strictEqual(startsWith('hello', 'hell', 1), false);
  strictEqual(startsWith('hello', 'hell', 2), false);
  strictEqual(startsWith('hello', 'hell', 3), false);
  strictEqual(startsWith('hello', 'hell', 4), false);
  strictEqual(startsWith('hello', 'hell', 5), false);
  strictEqual(startsWith('hello', 'hell', 20), false);
});

