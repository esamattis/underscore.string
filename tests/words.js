var deepEqual = require('assert').deepEqual;
var words = require('../words');


test('#words', function() {
  deepEqual(words('I love you!'), ['I', 'love', 'you!']);
  deepEqual(words(' I    love   you!  '), ['I', 'love', 'you!']);
  deepEqual(words('I_love_you!', '_'), ['I', 'love', 'you!']);
  deepEqual(words('I-love-you!', /-/), ['I', 'love', 'you!']);
  deepEqual(words(123), ['123'], '123 number has one word "123".');
  deepEqual(words(0), ['0'], 'Zero number has one word "0".');
  deepEqual(words(''), [], 'Empty strings has no words.');
  deepEqual(words('   '), [], 'Blank strings has no words.');
  deepEqual(words(null), [], 'null has no words.');
  deepEqual(words(undefined), [], 'undefined has no words.');
});

