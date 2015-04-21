var ok = require('assert').ok;
var include = require('../include');
var s = require('../dist/underscore.string');


test('#include', function() {
  ok(include('foobar', 'bar'), 'foobar includes bar');
  ok(!include('foobar', 'buzz'), 'foobar does not includes buzz');
  ok(include(12345, 34), '12345 includes 34');
  ok(!s.contains(12345, 6), '12345 does not includes 6');
  ok(!include('', 34), 'empty string includes 34');
  ok(!include(null, 34), 'null includes 34');
  ok(include(null, ''), 'null includes empty string');
});

