var ok = require('assert').ok;
var chop = require('../chop');


test('#chop', function(){
  ok(chop(null, 2).length === 0, 'output []');
  ok(chop('whitespace', 2).length === 5, 'output [wh, it, es, pa, ce]');
  ok(chop('whitespace', 3).length === 4, 'output [whi, tes, pac, e]');
  ok(chop('whitespace')[0].length === 10, 'output [whitespace]');
  ok(chop(12345, 1).length === 5, 'output [1, 2, 3,  4, 5]');
});

