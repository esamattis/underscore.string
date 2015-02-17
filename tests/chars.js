var equal = require('assert').equal;
var chars = require('../chars');


test('#chars', function() {
  equal(chars('Hello').length, 5);
  equal(chars(123).length, 3);
  equal(chars('').length, 0);
  equal(chars(null).length, 0);
  equal(chars(undefined).length, 0);
});

