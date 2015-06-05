var equal = require('assert').equal;
var numberFormat = require('../numberFormat');


test('#numberFormat', function() {
  equal(numberFormat(9000), '9,000');
  equal(numberFormat(9000, 0), '9,000');
  equal(numberFormat(9000, 0, '', ''), '9000');
  equal(numberFormat(90000, 2), '90,000.00');
  equal(numberFormat(1000.754), '1,001');
  equal(numberFormat(1000.754, 2), '1,000.75');
  equal(numberFormat(1000.755, 2), '1,000.75');
  equal(numberFormat(1000.756, 2), '1,000.76');
  equal(numberFormat(1000.754, 0, ',', '.'), '1.001');
  equal(numberFormat(1000.754, 2, ',', '.'), '1.000,75');
  equal(numberFormat(1000000.754, 2, ',', '.'), '1.000.000,75');
  equal(numberFormat(1000000000), '1,000,000,000');
  equal(numberFormat(100000000), '100,000,000');
  equal(numberFormat('not number'), '');
  equal(numberFormat(), '');
  equal(numberFormat(null, '.', ','), '');
  equal(numberFormat(undefined, '.', ','), '');
  equal(numberFormat(new Number(5000)), '5,000');
});

