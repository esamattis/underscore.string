var equal = require('assert').equal;
var swapCase = require('../swapCase');


test('#swapCase', function(){
  equal(swapCase('AaBbCcDdEe'), 'aAbBcCdDeE');
  equal(swapCase('Hello World'), 'hELLO wORLD');
  equal(swapCase(''), '');
  equal(swapCase(null), '');
  equal(swapCase(undefined), '');
});

