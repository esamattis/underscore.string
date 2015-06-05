var equal = require('assert').equal;
var lrpad = require('../lrpad');


test('#lrpad', function() {
  equal(lrpad('1', 8), '    1   ');
  equal(lrpad(1, 8), '    1   ');
  equal(lrpad('1', 8, '0'), '00001000');
  equal(lrpad('foo', 8, '0'), '000foo00');
  equal(lrpad('foo', 7, '0'), '00foo00');
  equal(lrpad('foo', 7, '!@$%dofjrofj'), '!!foo!!');
  equal(lrpad('', 2), '  ');
  equal(lrpad(null, 2), '  ');
  equal(lrpad(undefined, 2), '  ');
});

