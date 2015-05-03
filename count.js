var makeString = require('./helper/makeString');

module.exports = function(str, substr) {
  return str.split(substr).length - 1;
};
