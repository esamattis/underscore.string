var s = require('../dist/underscore.string');
var equal = require('assert').equal;
var deepEqual = require('assert').deepEqual;
var strictEqual = require('assert').strictEqual;


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

test("tap breaks the chain if the return value is not a string", function() {
  var res = s("foo").tap(function(value) {
    return value === "foo";
  });

  strictEqual(res, true);
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

test("prototype methods are available in the chain", function() {
  var chain = s("foo");
  [
      "toUpperCase",
      "toLowerCase",
      "split",
      "replace",
      "slice",
      "substring",
      "substr",
      "concat"
  ].forEach(function(method) {
    equal(typeof chain[method], "function", "has method: " + method);
  });

});

test("PROTOTYPE: toUpperCase", function() {
  equal(s("foo").toUpperCase().value(), "FOO");
});

test("PROTOTYPE: toLowerCase", function() {
  equal(s("BAR").toLowerCase().value(), "bar");
});

test("PROTOTYPE: split", function() {
  deepEqual(s("foo bar").split(" "), ["foo", "bar"]);
});

test("PROTOTYPE: replace", function() {
  equal(s("faa").replace("a", "o").value(), "foa");
});

test("PROTOTYPE: slice", function() {
  equal(s("#anchor").slice(1).value(), "anchor");
});

test("PROTOTYPE: substring", function() {
  equal(s("foobar").substring(0, 3).value(), "foo");
});

test("PROTOTYPE: substring", function() {
  equal(s("foobar!").substr(3, 3).value(), "bar");
});

test("PROTOTYPE: concat", function() {
  equal(s("foo").concat("bar").value(), "foobar");
});

test("PROTOTYPE: can combine methods", function() {
  equal(
    s("  foo  bar").toUpperCase().concat("   BAZ").clean().value(),
    "FOO BAR BAZ"
  );
});
