var equal = require('assert').equal;
var deepEqual = require('assert').deepEqual;
var succ = require('../succ');


test('#succ', function(){
  equal(succ('a'), 'b');
  equal(succ('A'), 'B');
  equal(succ('+'), ',');
  equal(succ(1), '2');
  deepEqual(succ().length, 0);
  deepEqual(succ('').length, 0);
  deepEqual(succ(null).length, 0);
  deepEqual(succ(undefined).length, 0);
  deepEqual(succ(), '');
  deepEqual(succ(''), '');
  deepEqual(succ(null), '');
  deepEqual(succ(undefined), '');
});

