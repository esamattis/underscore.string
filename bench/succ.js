var succ = require('../succ');

module.exports = function() {
  var letter = 'a', alphabet = [];

  for (var i=0; i < 26; i++) {
      alphabet.push(letter);
      letter = succ(letter);
  }

  return alphabet;
};
