var equal = require('assert').equal;
var deepEqual = require('assert').deepEqual;
var pred = require('../pred');


test('#pred', function(){
  equal(pred('b'), 'a');
  equal(pred('B'), 'A');
  equal(pred(','), '+');
  equal(pred(2), '1');
  deepEqual(pred().length, 0);
  deepEqual(pred('').length, 0);
  deepEqual(pred(null).length, 0);
  deepEqual(pred(undefined).length, 0);
  deepEqual(pred(), '');
  deepEqual(pred(''), '');
  deepEqual(pred(null), '');
  deepEqual(pred(undefined), '');
});

