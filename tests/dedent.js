var equal = require('assert').equal;
var deepEqual = require('assert').deepEqual;
var dedent = require('../dedent');


test('#dedent', function() {
  equal(dedent('Hello\nWorld'), 'Hello\nWorld');
  equal(dedent('Hello\t\nWorld'), 'Hello\t\nWorld');
  equal(dedent('Hello \nWorld'), 'Hello \nWorld');
  equal(dedent('Hello\n  World'), 'Hello\n  World');
  equal(dedent('    Hello\n  World'), '  Hello\nWorld');
  equal(dedent('  Hello\nWorld'), '  Hello\nWorld');
  equal(dedent('  Hello World'), 'Hello World');
  equal(dedent('  Hello\n  World'), 'Hello\nWorld');
  equal(dedent('  Hello\n    World'), 'Hello\n  World');
  equal(dedent('\t\tHello\tWorld'), 'Hello\tWorld');
  equal(dedent('\t\tHello\n\t\tWorld'), 'Hello\nWorld');
  equal(dedent('Hello\n\t\tWorld'), 'Hello\n\t\tWorld');
  equal(dedent('\t\tHello\n\t\t\t\tWorld'), 'Hello\n\t\tWorld');
  equal(dedent('\t\tHello\r\n\t\t\t\tWorld'), 'Hello\r\n\t\tWorld');
  equal(dedent('\t\tHello\r\n\r\n\t\t\t\tWorld'), 'Hello\r\n\r\n\t\tWorld');
  equal(dedent('\t\tHello\n\n\n\n\t\t\t\tWorld'), 'Hello\n\n\n\n\t\tWorld');
  equal(dedent('\t\t\tHello\n\t\tWorld', '\\t'), '\t\tHello\n\tWorld');
  equal(dedent('    Hello\n    World', '  '), '  Hello\n  World');
  equal(dedent('    Hello\n    World', ''), '    Hello\n    World');
  equal(dedent('\t\tHello\n\n\n\n\t\t\t\tWorld', '\\t'), '\tHello\n\n\n\n\t\t\tWorld');
  equal(dedent('Hello\n\t\tWorld', '\t'), 'Hello\n\t\tWorld');
  equal(dedent('Hello\n  World', ' '), 'Hello\n  World');
  equal(dedent('  Hello\nWorld', ' '), '  Hello\nWorld');
  deepEqual(dedent(123), '123');
  deepEqual(dedent(''), '');
  deepEqual(dedent(null), '');
  deepEqual(dedent(undefined), '');
});

