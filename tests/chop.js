var deepEqual = require('assert').deepEqual;
var chop = require('../chop');


test('#chop', function(){
  deepEqual(chop(null, 2), [], 'output []');
  deepEqual(chop('whitespace', 2), ['wh', 'it', 'es', 'pa', 'ce'], 'output [wh, it, es, pa, ce]');
  deepEqual(chop('whitespace', 3), ['whi', 'tes', 'pac', 'e'], 'output [whi, tes, pac, e]');
  deepEqual(chop('whitespace'), ['whitespace'], 'output [whitespace]');
  deepEqual(chop(12345, 1), ['1', '2', '3', '4', '5'], 'output [1, 2, 3, 4, 5]');
});
