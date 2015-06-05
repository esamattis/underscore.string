var equal = require('assert').equal;
var pad = require('../pad');


test('#pad', function() {
  equal(pad('1', 8), '       1');
  equal(pad(1, 8), '       1');
  equal(pad('1', 8, '0'), '00000001');
  equal(pad('1', 8, '0', 'left'), '00000001');
  equal(pad('1', 8, '0', 'right'), '10000000');
  equal(pad('1', 8, '0', 'both'), '00001000');
  equal(pad('foo', 8, '0', 'both'), '000foo00');
  equal(pad('foo', 7, '0', 'both'), '00foo00');
  equal(pad('foo', 7, '!@$%dofjrofj', 'both'), '!!foo!!');
  equal(pad('', 2), '  ');
  equal(pad(null, 2), '  ');
  equal(pad(undefined, 2), '  ');
});

