var equal = require('assert').equal;
var stripTags = require('../stripTags');


test('#stripTags', function() {
  equal(stripTags('a <a href="#">link</a>'), 'a link');
  equal(stripTags('a <a href="#">link</a><script>alert("hello world!")</scr'+'ipt>'), 'a linkalert("hello world!")');
  equal(stripTags('<html><body>hello world</body></html>'), 'hello world');
  equal(stripTags('<h1 id="foo" data-foo="bar">hello world</body></h1>'), 'hello world');
  equal(stripTags('<web-component>hello world</web-component>'), 'hello world');
  equal(stripTags('<ReactComponent.Title>hello world</ReactComponent.Title>'), 'hello world');
  equal(stripTags('I have < I want, but that is > nothing'), 'I have < I want, but that is > nothing');
  equal(stripTags('<!-- a html comment --->hello world<!-- a html comment --->'), 'hello world');
  equal(stripTags(123), '123');
  equal(stripTags(''), '');
  equal(stripTags(null), '');
  equal(stripTags(undefined), '');
});

