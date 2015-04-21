var equal = require('assert').equal;
var truncate = require('../truncate');


test('#truncate', function(){
  equal(truncate('Hello world', 6, 'read more'), 'Hello read more');
  equal(truncate('Hello world', 5), 'Hello...');
  equal(truncate('Hello', 10), 'Hello');
  equal(truncate('', 10), '');
  equal(truncate(null, 10), '');
  equal(truncate(undefined, 10), '');
  equal(truncate(1234567890, 5), '12345...');
});

