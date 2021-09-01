// String formatting using {\d+} placeholders, which allows different
// order of the placeholders than the formatting arguments are in.
// See http://stackoverflow.com/a/5077091/623816.
// See http://jsfiddle.net/prantlf/L77L9/.
// See http://jsperf.com/string-formatting-with-positioning-placeholders.

var pattern = /\{\{|\}\}|\{(\d+)\}/g;

module.exports = function sformat() {
  var parameters = arguments;
  if (typeof parameters[0] !== 'string')
    throw new Error('The formatting pattern must be a string');
  return parameters[0].replace(pattern, function (match, group) {
    var value;
    if (match === '{{')
      return '{';
    if (match === '}}')
      return '}';
    value = parameters[parseInt(group, 10) + 1];
    return value != undefined ? value.toString() : '';
  });
};
