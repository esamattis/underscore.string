//  underscore.string//  (c) 2012 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation http://epeli.github.com/underscore.string/
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version 2.3.0

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;
  var upperCase = function(){ return arguments[arguments.length-1].toUpperCase(); };
  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    amp: '&'
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = { VERSION: '3.0.0' };

  // Returns boolean indicating if the string is empty or not
  // Strings containing only spaces or new line feeds are considered empty
  _s.isBlank = function(str){
    if (str == null) str = '';
    return (/^\s*$/).test(str);
  };

  // Strips all tags from given string.
  // Should not be used as 100% safe sanitizer, since a clever enough hacker
  // will always find a way to trick a simple implementation like this one.
  _s.stripTags = function(str){
    if (str == null) return '';
    return String(str).replace(/<\/?[^>]+>/g, '');
  };

  // Returns the given string lowercased with first letter capitalized
  _s.capitalize = function(str){
    str = str == null ? '' : String(str);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Chops strings in parts of length given as a second argument.
  // If no seconds argument is provided, returns the array containing
  // initial string.
  _s.chop = function(str, step){
    if (str == null) return [];
    str = String(str);
    step = ~~step;
    return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
  };

  // Return trimmed string with all whitespaces squashed into single space.
  // Often good for normalizing user input.
  _s.clean = function(str){
    return _s.strip(str).replace(/\s+/g, ' ');
  };

  // Counts the number of substring occurrences in the string.
  _s.count = function(str, substr){
    if (str == null || substr == null) return 0;

    str = String(str);
    substr = String(substr);

    var count = 0,
      pos = 0,
      length = substr.length;

    while (true) {
      pos = str.indexOf(substr, pos);
      if (pos === -1) break;
      count++;
      pos += length;
    }

    return count;
  };

  // Returns array of separate chars chopped from the string.
  // Kinda like _.chop(str, 1)
  _s.chars = function(str) {
    if (str == null) return [];
    return String(str).split('');
  };

  // Returns the given string with swapped case for all characters
  _s.swapCase = function(str) {
    if (str == null) return '';
    return String(str).replace(/\S/g, function(c){
      return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    });
  };

  // Returns the string with escaped HTML.
  _s.escapeHTML = function(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, function(m){
      return '&' + (m === "'" ? '#39' : reversedEscapeChars[m]) + ';';
    });
  };

  // Tries to find any escaped HTML in the string and unescape it.
  // Aware of many different escaping techniques.
  _s.unescapeHTML = function(str) {
    if (str == null) return '';
    return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
      var match;

      if (entityCode in escapeChars) {
        return escapeChars[entityCode];
      } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
        return String.fromCharCode(parseInt(match[1], 16));
      } else if (match = entityCode.match(/^#(\d+)$/)) {
        return String.fromCharCode(~~match[1]);
      } else {
        return entity;
      }
    });
  };

  // Returns regexp-escaped version of the given string
  _s.escapeRegExp = function(str){
    if (str == null) return '';
    return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  };

  // Exactly like an array splice, but for strings
  _s.splice = function(str, i, howmany, substr){
    var arr = _s.chars(str);
    arr.splice(~~i, ~~howmany, substr);
    return arr.join('');
  };

  // Inserts substring into a given position in a string
  _s.insert = function(str, i, substr){
    return _s.splice(str, i, 0, substr);
  };

  // Returns boolean indicating if the string contains substring
  _s.include = function(str, substr){
    if (substr === '') return true;
    if (str == null) return false;
    return String(str).indexOf(substr) !== -1;
  };

  // Returns all arguments concatenated/joined with the first argument
  _s.join = function(separator){
    if (separator == null) separator = '';
    return slice.call(arguments, 1).join(separator);
  };

  // Returns array of lines in a given string
  _s.lines = function(str) {
    if (str == null) return [];
    return String(str).split("\n");
  };

  // Returns given string reversed
  _s.reverse = function(str){
    return _s.chars(str).reverse().join('');
  };

  // Returns boolean representing if the given string starts with substring
  _s.startsWith = function(str, starts){
    if (starts === '') return true;
    if (str == null || starts == null) return false;
    str = String(str); starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
  };

  // Returns boolean representing if the given string ends with substring
  _s.endsWith = function(str, ends){
    if (ends === '') return true;
    if (str == null || ends == null) return false;
    str = String(str); ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
  };

  // Returns the character next to
  _s.succ = function(str){
    if (str == null) return '';
    return String(str).replace(/.$/, function(c){ return String.fromCharCode(c.charCodeAt(0) + 1); });
  };

  // Returns the given string with every word capitalized
  _s.titleize = function(str){
    if (str == null) return '';
    return String(str).replace(/(?:^|\s)\S/g, function(c){ return c.toUpperCase(); });
  };

  // Returns given string in camelCase
  _s.camelize = function(str){
    return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c.toUpperCase(); });
  };

  // Converts a camelized or dasherized string into an underscored form
  _s.underscored = function(str){
    return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
  };

  // Converts a underscored or camelized string into an dasherized one
  _s.dasherize = function(str){
    return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
  };

  // Converts string to camelized class name
  _s.classify = function(str){
    if (str == null) return '';
    return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
  };

  // Converts an underscored, camelized, or dasherized string into a humanized one.
  // Also cleans the string and removes '_id' postfix.
  _s.humanize = function(str){
    return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
  };

  // Returns given string with leading and trailing whitespace removed.
  // Can also remove characters provided as the second argument instead of whitespace.
  _s.trim = function(str, characters){
    if (str == null) return '';
    if (!characters && nativeTrim) return nativeTrim.call(str);
    characters = defaultToWhiteSpace(characters);
    return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
  };

  // Returns given string with leading whitespace removed.
  // See also #trim and #rtrim methods
  _s.ltrim = function(str, characters){
    if (str == null) return '';
    if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
    return String(str).replace(new RegExp('^' + defaultToWhiteSpace(characters) + '+'), '');
  };


  // Returns given string with trailing whitespace removed.
  // See also #trim and #ltrim methods
  _s.rtrim = function(str, characters){
    if (str == null) return '';
    if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
    return String(str).replace(new RegExp(defaultToWhiteSpace(characters) + '+$'), '');
  };


  // Returns given string truncated after a given length
  // returns non-modified string if its length is less that length argument
  _s.truncate = function(str, length, truncateStr){
    if (str == null) return '';
    str = String(str); truncateStr = truncateStr || '...';
    length = ~~length;
    return str.length > length ? str.slice(0, length) + truncateStr : str;
  };

  // Does pretty much the same as #truncate method, but do not
  // leave half-chopped words at the end of the string
  _s.prune = function(str, length, pruneStr){
    if (str == null) return '';

    str = String(str); length = ~~length;
    pruneStr = pruneStr != null ? String(pruneStr) : '...';

    if (str.length <= length) return str;

    var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
      template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

    if (template.slice(template.length-2).match(/\w\w/))
      template = template.replace(/\s*\S+$/, '');
    else
      template = _s.rtrim(template.slice(0, template.length-1));

    return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
  };

  // Returns string splitted by delimiter (String or RegExp), /\s+/ by default.
  _s.words = function(str, delimiter){
    if (_s.isBlank(str)) return [];
    return _s.trim(str, delimiter).split(delimiter || /\s+/);
  };

  // Pads the `str` with characters until the total string length is equal
  // to the passed `length` parameter. By default, pads on the **left** with
  // the space char (`" "`). `padStr` is truncated to a single character if necessary.
  _s.pad = function(str, length, padStr, type){
    str = str == null ? '' : String(str);
    length = ~~length;

    var padlen = 0;

    if (padStr == null)
      padStr = ' ';
    else
      padStr = String(padStr);

    if (padStr.length > 1) padStr = padStr.charAt(0);

    switch(type) {
      case 'right':
        padlen = length - str.length;
        return str + strRepeat(padStr, padlen);
      case 'both':
        padlen = length - str.length;
        return strRepeat(padStr, Math.ceil(padlen/2)) + str
                + strRepeat(padStr, Math.floor(padlen/2));
      default: // 'left'
        padlen = length - str.length;
        return strRepeat(padStr, padlen) + str;
      }
  };

  // TODO: description
  _s.lpad = function(str, length, padStr){
    return _s.pad(str, length, padStr);
  };

  // TODO: description
  _s.rpad = function(str, length, padStr) {
    return _s.pad(str, length, padStr, 'right');
  };

  // TODO: description
  _s.lrpad = function(str, length, padStr) {
    return _s.pad(str, length, padStr, 'both');
  };

  // TODO: description
  _s.sprintf = sprintf;

  // TODO: description
  _s.vsprintf = function(fmt, argv){
    return sprintf.apply(null, [fmt].concat(argv));
  };

  // TODO: description
  _s.toNumber = function(str, decimals){
    if (!str) return 0;
    str = String(str);
    return Number(Number(str).toFixed(~~decimals));
  };

  // TODO: description
  _s.numberFormat = function(number, dec, dsep, tsep){
    if (number == null) return '';
    number = Number(number);
    if (isNaN(number)) return '';
    if (tsep == null) tsep = ',';
    if (dsep == null) dsep = '.';

    number = number.toFixed(~~dec);

    var parts = number.split('.'), fnums = parts[0],
      decimals = parts[1] ? dsep + parts[1] : '';

    return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
  };

  // TODO: description
  _s.strRight = function(str, sep){
    if (str == null) return '';
    str = String(str); sep = sep != null ? String(sep) : sep;
    var pos = !sep ? -1 : str.indexOf(sep);
    return ~pos ? str.slice(pos+sep.length, str.length) : str;
  };

  // TODO: description
  _s.strRightBack = function(str, sep){
    if (str == null) return '';
    str = String(str); sep = sep != null ? String(sep) : sep;
    var pos = !sep ? -1 : str.lastIndexOf(sep);
    return ~pos ? str.slice(pos+sep.length, str.length) : str;
  };

  // TODO: description
  _s.strLeft = function(str, sep){
    if (str == null) return '';
    str = String(str); sep = sep != null ? String(sep) : sep;
    var pos = !sep ? -1 : str.indexOf(sep);
    return ~pos ? str.slice(0, pos) : str;
  };

  // TODO: description
  _s.strLeftBack = function(str, sep){
    if (str == null) return '';
    str += ''; sep = sep != null ? ''+sep : sep;
    var pos = str.lastIndexOf(sep);
    return ~pos ? str.slice(0, pos) : str;
  };

  // TODO: description
  _s.toSentence = function(array, separator, lastSeparator, serial){
    separator = separator || ', '
    lastSeparator = lastSeparator || ' and '
    var a = array.slice(), lastMember = a.pop();

    if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

    return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
  };

  // TODO: description
  _s.toSentenceSerial = function(){
    var args = slice.call(arguments);
    args[3] = true;
    return _s.toSentence.apply(_s, args);
  };

  // TODO: description
  _s.slugify = function(str) {
    if (str == null) return '';

    var from  = 'ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź',
        to    = 'aaaaaaaaceeeeeiiiilnoooooouuuunczz',
        regex = new RegExp(defaultToWhiteSpace(from), 'g');

    str = String(str).toLowerCase().replace(regex, function(c){
      var index = from.indexOf(c);
      return to.charAt(index) || '-';
    });

    return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
  };

  // TODO: description
  _s.surround = function(str, wrapper){
    return [ wrapper, str, wrapper ].join('');
  };

  // TODO: description
  _s.quote = function(str) {
    return _s.surround(str, '"');
  };

  // TODO: description
  _s.repeat = function(str, qty, separator){
    if (str == null) return '';

    qty = ~~qty;

    // using faster implementation if separator is not needed;
    if (separator == null) return strRepeat(String(str), qty);

    // this one is about 300x slower in Google Chrome
    for (var repeat = []; qty > 0; repeat[--qty] = str) {}
    return repeat.join(separator);
  };

  // TODO: description
  _s.levenshtein = function(str1, str2){
    if (str1 == null && str2 == null) return 0;
    if (str1 == null) return String(str2).length;
    if (str2 == null) return String(str1).length;

    str1 = String(str1); str2 = String(str2);

    var current = [], prev, value;

    for (var i = 0; i <= str2.length; i++)
      for (var j = 0; j <= str1.length; j++) {
        if (i && j)
          if (str1.charAt(j - 1) === str2.charAt(i - 1))
            value = prev;
          else
            value = Math.min(current[j], current[j - 1], prev) + 1;
        else
          value = i + j;

        prev = current[j];
        current[j] = value;
      }

    return current.pop();
  };

  // Aliases
  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.includes = _s.include;
  _s.contains = _s.include;
  _s.q        = _s.quote;


  // Integration into Underscore.
  var integrate = function(_){
    if (!_) return { str: _s };

    // function to determine if we should use _s or _ method.
    var useStringMethod = function(obj){ return obj == null || _.isString(obj) || _.isNumber(obj); }

    // part of _s that is safe to merge into _ by regular _.mixin
    var safeExports = _.omit(_s, 'include', 'contains', 'reverse', 'splice');

    _.mixin(safeExports);

    // _s methods that conflict with _
    _.mixin(_.reduce(['include', 'contains'], function(memo, methodName){
      var strMethod = _s[methodName], underscoreMethod = _[methodName];

      memo[methodName] = function(obj){
        var method = useStringMethod(obj) ? strMethod : underscoreMethod;
        return method.apply(this, arguments);
      };

      return memo;
    }, {}));

    // _s methods that conflict with _ method chaining
    _.each(['reverse', 'splice'], function(methodName){
      var strMethod = _s[methodName],
        underscoreMethod = _.prototype[methodName],
        mixObject = {};

      mixObject[methodName] = strMethod;

      // getting wrapped underscore prototype method
      _.mixin(mixObject);
      var wrappedMethod = _.prototype[methodName]

      // Changing prototype method to switch between _s and _
      _.prototype[methodName] = function(){
        var method = useStringMethod(this._wrapped) ? wrappedMethod : underscoreMethod;
        return method.apply(this, arguments);
      };
    });

    // Finally, doing old-style _.str integration
    _.str = _.string = _s;

    return _;
  };


  // Exporting

  // Integrating with Underscore
  root._ = integrate(root._);

  _s.integrate = integrate;

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });
}(this, String);