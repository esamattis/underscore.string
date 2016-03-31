var endsWith = require('./endsWith');
var makeString = require('./helper/makeString');

module.exports = function addPossession(str) {
  str = makeString(str);

  if (endsWith(str, '\'')) {
    return str;
  }
  if (endsWith(str, '\'s') || endsWith(str, '`s') || endsWith(str, '´s')) {
    return str;
  }
  if (endsWith(str, 's')) {
    return str + '\'';
  }

  return str + '\'s';
};
