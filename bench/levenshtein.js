var levenshtein = require('../levenshtein');

module.exports = function() {
    levenshtein('pineapple', 'potato');
    levenshtein('seven', 'eight');
    levenshtein('the very same string', 'the very same string');
    levenshtein('very very very long string', 'something completely different');
};
