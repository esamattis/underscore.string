module.exports = function surround(str, lWwrapper, rWrapper) {
  return [lWwrapper, str, ((rWrapper !== undefined && rWrapper !== null) ? rWrapper : lWwrapper)].join('');
};
