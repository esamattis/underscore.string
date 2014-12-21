var trim = require('./trim');
var parseNumber = function(source) {
  return source * 1 || 0;
};

module.exports = function toNumber(str, decimals) {
  if (!str) return 0;
  str = trim(str);
  if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
  return parseNumber(parseNumber(str).toFixed(~~decimals));
};
