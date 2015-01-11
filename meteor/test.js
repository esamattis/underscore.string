Tinytest.add('underscore.string.is', function(test) {
  test.instanceOf(_s, Object);
  test.equal(_s.capitalize("test"), "Test");
});