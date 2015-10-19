var rtrim = require('./rtrim');

module.exports = function toSentence(array, separator, lastSeparator, serial) {
  // remove empty elements from array
  array = array.filter(function(item) {
    return item != '' && item != undefined && item != null
  });

  // fail early if array is empty
  if (array.length == 0) {
    return '';
  }

  separator = separator || ', ';
  lastSeparator = lastSeparator || ' and ';
  var a = array.slice(),
    lastMember = a.pop();

  if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

  return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
};
