var makeString = require('./helper/makeString');
var escapeRegExp = require('./helper/escapeRegExp');


module.exports = function around(str, search, lWrapper, rWrapper) {
  str      = makeString(str);
  search   = escapeRegExp(search);
  lWrapper = makeString(lWrapper);

  return (search.length > 0 ? str.replace(new RegExp(search, 'g'), lWrapper + '$&' + ((rWrapper !== null && rWrapper !== undefined) ? makeString(rWrapper) : lWrapper)) : str);
};
