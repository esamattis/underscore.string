var makeString = require('./helper/makeString');

module.exports = function succ(str) {
  str = makeString(str);
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + 1);
};
