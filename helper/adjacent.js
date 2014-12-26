var makeString = require('./makeString');

module.exports = function adjacent(str, direction) {
  str = makeString(str);
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + direction);
};
