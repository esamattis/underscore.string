var equal = require('assert').equal;
var throws = require('assert').throws;
var toSentence = require('../toSentence');


test('#toSentence', function() {
  equal(toSentence(['jQuery']), 'jQuery', 'array with a single element');
  equal(toSentence(['jQuery', 'MooTools']), 'jQuery and MooTools', 'array with two elements');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools and Prototype', 'array with three elements');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype', 'YUI']), 'jQuery, MooTools, Prototype and YUI', 'array with multiple elements');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype'], ',', ' or '), 'jQuery,MooTools or Prototype', 'handles custom separators');
  equal(toSentence(['jQuery', 'MooTools', 'Prototype'], ',', ' or ', true), 'jQuery,MooTools, or Prototype', 'with serial flag true');
  throws(toSentence([]), 'empty array');
  throws(toSentence([null, undefined]), 'array with null and undefined');
  equal(toSentence(['jQuery', null, undefined]), 'jQuery,  and undefined', 'array with null and undefined at the end');
  equal(toSentence(['jQuery', null, undefined, 'MooTools']), 'jQuery, ,  and MooTools', 'array with null and undefined in the middle');
  equal(toSentence(['']), '', 'array with single empty element');
  throws(toSentence(['', '']), '', 'array with two empty elements');
  equal(toSentence(['jQuery', '']), 'jQuery and ', 'array with empty element at the end');
  equal(toSentence(['jQuery', '', 'MooTools']), 'jQuery,  and MooTools', 'array with empty element in the middle');
});

