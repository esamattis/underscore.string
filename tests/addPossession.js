var equal = require('assert').equal;
var addPossession = require('../addPossession');


test('#addPossession', function() {
  equal(addPossession('Apples\''), 'Apples\'');
  equal(addPossession('Apple\'s'), 'Apple\'s');
  equal(addPossession('Apple\`s'), 'Apple\`s');
  equal(addPossession('Apple\´s'), 'Apple\´s');
  equal(addPossession('Apples'), 'Apples\'');
  equal(addPossession('Apple'), 'Apple\'s');
});
