var equal = require('assert').equal;
var ok = require('assert').ok;
var _ = require('underscore');
var toNumber = require('../toNumber');


test('#toNumber', function() {
  _.each(['not a number', NaN, {}, [/a/], 'alpha6'], function(val) {
    ok(isNaN(toNumber('not a number')));
    equal(toNumber(Math.PI, val), 3);
  });
  equal(toNumber(0), 0);
  equal(toNumber('0'), 0);
  equal(toNumber('0.0'), 0);
  equal(toNumber('        0.0    '), 0);
  equal(toNumber('0.1'), 0);
  equal(toNumber('0.1', 1), 0.1);
  equal(toNumber('  0.1 ', 1), 0.1);
  equal(toNumber('0000'), 0);
  equal(toNumber('2.345'), 2);
  equal(toNumber('2.345', NaN), 2);
  equal(toNumber('2.345', 2), 2.35);
  equal(toNumber('2.344', 2), 2.34);
  equal(toNumber('2', 2), 2.00);
  equal(toNumber(2, 2), 2.00);
  equal(toNumber(-2), -2);
  equal(toNumber('-2'), -2);
  equal(toNumber(-2.5123, 3), -2.512);

  // Negative precisions
  equal(toNumber(-234, -1), -230);
  equal(toNumber(234, -2), 200);
  equal(toNumber('234', -2), 200);

  _.each(['', null, undefined], function(val) {
    equal(toNumber(val), 0);
  });

  _.each([Infinity, -Infinity], function(val) {
    equal(toNumber(val), val);
    equal(toNumber(val, val), val);
    equal(toNumber(1, val), 1);
  });
});

