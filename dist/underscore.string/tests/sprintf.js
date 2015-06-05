var equal = require('assert').equal;
var sprintf = require('../sprintf');


test('#sprintf', function() {
  // Should be very tested function already.  Thanks to
  // http://www.diveintojavascript.com/projects/sprintf-for-javascript
  equal(sprintf('Hello %s', 'me'), 'Hello me', 'basic');
  equal(sprintf('Hello %s', 'me'), 'Hello me', 'object');
  equal(sprintf('%.1f', 1.22222), '1.2', 'round');
  equal(sprintf('%.1f', 1.17), '1.2', 'round 2');
  equal(sprintf('%(id)d - %(name)s', {id: 824, name: 'Hello World'}), '824 - Hello World', 'Named replacements work');
  equal(sprintf('%(args[0].id)d - %(args[1].name)s', {args: [{id: 824}, {name: 'Hello World'}]}), '824 - Hello World', 'Named replacements with arrays work');
});

