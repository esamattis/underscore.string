var capitalize = require('./capitalize');
var underscored = require('./underscored');

module.exports = function humanize(str) {
  return capitalize(underscored(str).replace(/_id$/, '').replace(/_/g, ' '));
};
