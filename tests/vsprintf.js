var equal = require('assert').equal;
var vsprintf = require('../vsprintf');


test('#vsprintf', function() {
  equal(vsprintf('Hello %s', ['me']), 'Hello me', 'basic');
  equal(vsprintf('Hello %s', ['me']), 'Hello me', 'object');
  equal(vsprintf('%.1f', [1.22222]), '1.2', 'round');
  equal(vsprintf('%.1f', [1.17]), '1.2', 'round 2');
  equal(vsprintf('%(id)d - %(name)s', [{id: 824, name: 'Hello World'}]), '824 - Hello World', 'Named replacement works');
  equal(vsprintf('%(args[0].id)d - %(args[1].name)s', [{args: [{id: 824}, {name: 'Hello World'}]}]), '824 - Hello World', 'Named replacement with arrays works');
});

