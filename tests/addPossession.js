var equal = require('assert').equal;
var addPossession = require('../addPossession');


test('#addPossession', function() {
  equal(addPossession('Apples\''), 'Apples\'');
  equal(addPossession('Apples\'s'), 'Apples\'s');
  equal(addPossession('Apples\`s'), 'Apples\`s');
  equal(addPossession('Apples\´s'), 'Apples\´s');
  equal(addPossession('Apples'), 'Apples\'');
  equal(addPossession('Apple'), 'Apple\'s');
});
