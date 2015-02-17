var equal = require('assert').equal;
var toSentenceSerial = require('../toSentenceSerial');


test('#toSentenceSerial', function (){
  equal(toSentenceSerial(['jQuery']), 'jQuery');
  equal(toSentenceSerial(['jQuery', 'MooTools']), 'jQuery and MooTools');
  equal(toSentenceSerial(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools, and Prototype');
});

