var equal = require('assert').equal;
var toSentence = require('../toSentence');


test('#toSentence', function() {
  equal(toSentence(['jQuery']), 'jQuery', 'array with a single element');
  equal(toSentence(['jQuery', 'MooTools']), 'jQuery and MooTools', 'array with two elements');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools and Prototype', 'array with three elements');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype', 'YUI']), 'jQuery, MooTools, Prototype and YUI', 'array with multiple elements');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype'], ',', ' or '), 'jQuery,MooTools or Prototype', 'handles custom separators');
});

