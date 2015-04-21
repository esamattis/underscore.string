var strictEqual = require('assert').strictEqual;
var toBoolean = require('../toBoolean');

test('#toBoolean', function() {
  strictEqual(toBoolean("false"), false);
  strictEqual(toBoolean("false"), false);
  strictEqual(toBoolean("False"), false);
  strictEqual(toBoolean("Falsy",null,["false", "falsy"]), false);
  strictEqual(toBoolean("true"), true);
  strictEqual(toBoolean("the truth", "the truth", "this is falsy"), true);
  strictEqual(toBoolean("this is falsy", "the truth", "this is falsy"), false);
  strictEqual(toBoolean("true"), true);
  strictEqual(toBoolean("trUe"), true);
  strictEqual(toBoolean("trUe", /tru?/i), true);
  strictEqual(toBoolean("something else"), undefined);
  strictEqual(toBoolean(function(){}), true);
  strictEqual(toBoolean(/regexp/), true);
  strictEqual(toBoolean(""), undefined);
  strictEqual(toBoolean(0), false);
  strictEqual(toBoolean(1), true);
  strictEqual(toBoolean("1"), true);
  strictEqual(toBoolean("0"), false);
  strictEqual(toBoolean(2), undefined);
  strictEqual(toBoolean("foo true bar"), undefined);
  strictEqual(toBoolean("foo true bar", /true/), true);
  strictEqual(toBoolean("foo FALSE bar", null, /FALSE/), false);
  strictEqual(toBoolean(" true  "), true);
});

