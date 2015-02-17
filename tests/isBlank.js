var ok = require('assert').ok;
var isBlank = require('../isBlank');


test('#isBlank', function(){
  ok(isBlank(''));
  ok(isBlank(' '));
  ok(isBlank('\n'));
  ok(!isBlank('a'));
  ok(!isBlank('0'));
  ok(!isBlank(0));
  ok(isBlank(''));
  ok(isBlank(null));
  ok(isBlank(undefined));
});

