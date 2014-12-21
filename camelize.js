var trim = require('./trim');

module.exports = function camelize(str) {
  return trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : "";
  });
};
