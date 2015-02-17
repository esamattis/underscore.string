var equal = require('assert').equal;
var levenshtein = require('../levenshtein');

test('#levenshtein', function() {
  equal(levenshtein('Godfather', 'Godfather'), 0);
  equal(levenshtein('Godfather', 'Godfathe'), 1);
  equal(levenshtein('Godfather', 'odfather'), 1);
  equal(levenshtein('Godfather', 'Gdfthr'), 3);
  equal(levenshtein('seven', 'eight'), 5);
  equal(levenshtein('123', 123), 0);
  equal(levenshtein(321, '321'), 0);
  equal(levenshtein('lol', null), 3);
  equal(levenshtein('lol'), 3);
  equal(levenshtein(null, 'lol'), 3);
  equal(levenshtein(undefined, 'lol'), 3);
  equal(levenshtein(), 0);
});

