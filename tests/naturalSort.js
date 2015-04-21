var assert = require('assert');
var naturalCmp = require('../naturalCmp');

test('#naturalSort', function() {
  var arr =  ['foo2', 'foo1', 'foo10', 'foo30', 'foo100', 'foo10bar'],
    sorted = ['foo1', 'foo2', 'foo10', 'foo10bar', 'foo30', 'foo100'];
  assert.deepEqual(arr.sort(naturalCmp), sorted);
});
