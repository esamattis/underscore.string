var makeString = require('./helper/makeString');
var tagsAndComments = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;

module.exports = function stripTags(str) {
  return makeString(str).replace(tagsAndComments, '');
};
