var escapeRegExp = require('./helper/escapeRegExp');

function extractorFor(pattern, size, tokenOrder) {
  return function (str) {
    var matches = String.prototype.match.call(str || "", new RegExp(pattern));
    if (matches === null) {
      return null;
    }

    var result = [];
    for (var i = 0; i < size; i++) {
      result[i] = matches[tokenOrder.indexOf(i) + 1];
    }

    return result;
  };
}

function extractorFromTemplate(template) {
  if (!template || typeof template !== "string") {
    return function () { return null; }
  }

  var tokens = (template.match(/\{([1-9]\d*)?\d\}/g) || [])
    .map(function(token) { return parseInt(token.substring(1, token.length - 1), 10); })
    .reduce(function(array, current) {
      if (array.indexOf(current) === -1) {
        array.push(current);
      }
      return array;
    }, []);

  var tokenNumber = tokens
    .map(function (token) { return token; })
    .sort(function(a, b) { return a - b; })
    .reduce(function (previous, token, index) {
      if (previous > index && token !== index) {
        return index;
      }
      return previous;
    }, tokens.length);

  template = escapeRegExp(template);
  for (var i = 0; i < tokenNumber; i++) {
    template = template.replace(escapeRegExp('{' + i + '}'), '(.+)');
  }

  return extractorFor(template, tokenNumber, tokens.filter(function (token) { return token < tokenNumber; }));
}

module.exports = function extract(template, str) {
  if (typeof str === "undefined") {
    return extractorFromTemplate(template);
  }
  return extractorFromTemplate(template)(str);
};
