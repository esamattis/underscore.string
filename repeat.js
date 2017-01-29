var makeString = require('./helper/makeString');
var strRepeat = require('./helper/strRepeat');

module.exports = function repeat(str, qty, separator) {
  str = makeString(str);

  qty = ~~qty;

  if (separator == null) {
    return strRepeat(str, qty);
  } else if (qty > 0) {
    var repeat = str + separator;
    return strRepeat(repeat, qty - 1) + str;
  } else {
    return '';
  }
};
