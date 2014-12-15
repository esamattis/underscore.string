var capitalize = require('./capitalize');
var camelize = require('./camelize');

module.exports = function classify(str) {
  return capitalize(camelize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
};
