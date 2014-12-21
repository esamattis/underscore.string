$(document).ready(function() {

  module("Standalone usage");

  test("provides standalone functions via the s global", function() {
    equal(typeof s.trim, "function");
  });

  test("has standalone chaining", function() {
    var res = s("  foo  ").trim().capitalize().value();
    equal(res, "Foo");
  });

  test("chaining supports tapping", function() {
    var res = s("foo").tap(function(value) {
      return "BAR" + value + "BAR";
    }).value();
    equal(res, "BARfooBAR");
  });

  test("chain objects are immutable", function() {
    var chain = s("foo");
    chain.capitalize();
    equal(chain.value(), "foo");
  });

  test("methods returning non-string values stops the chain", function() {
    strictEqual(s("foobar").startsWith("foo"), true);
    strictEqual(s("foobar").endsWith("foo"), false);
    deepEqual(s("hello\nworld").lines(), ["hello", "world"]);
  });

});
