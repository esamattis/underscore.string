var equal = require('assert').equal;
var stripTags = require('../stripTags');


test('#stripTags', function() {
  equal(stripTags('a <a href="#">link</a>'), 'a link');
  equal(stripTags('a <a href="#">link</a><script>alert("hello world!")</scr'+'ipt>'), 'a linkalert("hello world!")');
  equal(stripTags('<html><body>hello world</body></html>'), 'hello world');
  equal(stripTags(123), '123');
  equal(stripTags(''), '');
  equal(stripTags(null), '');
  equal(stripTags(undefined), '');
});

