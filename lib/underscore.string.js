//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.4.0'

// Import helpers
import {makeString} from "lib/helpers/make_string";
import {boolMatch} from "lib/helpers/bool_match";
import {toString} from "lib/helpers/to_string";
import {parseNumber} from "lib/helpers/parse_number";
import {sprintf} from "lib/helpers/sprintf";
import {strRepeat} from "lib/helpers/str_repeat";
import {defaultToWhiteSpace} from "lib/helpers/default_to_whitespace";

// Import functions
import {isBlank} from "lib/is_blank";
import {stripTags} from "lib/strip_tags";
import {capitalize} from "lib/capitalize";
import {decapitalize} from "lib/decapitalize";
import {chop} from "lib/chop";
import {clean} from "lib/clean";
import {count} from "lib/count";
import {trim} from "lib/trim";
import {rtrim} from "lib/rtrim";
import {ltrim} from "lib/ltrim";
import {titleize} from "lib/titleize";
import {chars} from "lib/chars";
import {swapCase} from "lib/swap_case";
import {escapeHTML} from "lib/escape_html";
import {unescapeHTML} from "lib/unescape_html";
import {escapeRegExp} from "lib/escape_reg_exp";
import {splice} from "lib/splice";
import {insert} from "lib/insert";
import {include} from "lib/include";
import {join} from "lib/join";
import {lines} from "lib/lines";
import {reverse} from "lib/reverse";
import {startsWith} from "lib/starts_with";
import {endsWith} from "lib/ends_with";
import {succ} from "lib/succ";
import {camelize} from "lib/camelize";
import {underscored} from "lib/underscored";
import {dasherize} from "lib/dasherize";
import {classify} from "lib/classify";
import {humanize} from "lib/humanize";
import {truncate} from "lib/truncate";
import {prune} from "lib/prune";
import {words} from "lib/words";
import {pad} from "lib/pad";

!function(root, String){
  'use strict';

  // Defining underscore.string
  var _s = {

    VERSION: '2.4.0',

    isBlank: isBlank,
    stripTags: stripTags,
    capitalize : capitalize,
    decapitalize : decapitalize,
    chop: chop,
    clean: clean,
    count: count,
    chars: chars,
    swapCase: swapCase,
    escapeHTML: escapeHTML,
    unescapeHTML: unescapeHTML,
    escapeRegExp: escapeRegExp,
    splice: splice,
    insert: insert,
    include: include,
    join: join,
    lines: lines,
    reverse: reverse,
    startsWith: startsWith,
    endsWith: endsWith,
    succ: succ,
    titleize: titleize,
    camelize: camelize,
    underscored: underscored,
    dasherize: dasherize,
    classify: classify,
    humanize: humanize,
    trim: trim,
    ltrim: ltrim,
    rtrim: rtrim,
    truncate: truncate,
    prune: prune,
    words: words,
    pad: pad,

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      str = makeString(str); sep = makeString(sep);
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      str = makeString(str); sep = makeString(sep);
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      str = makeString(str); sep = makeString(sep);
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      str = makeString(str); sep = makeString(sep);
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', ';
      lastSeparator = lastSeparator || ' and ';
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function(array, sep, lastSep) {
      return _s.toSentence(array, sep, lastSep, true);
    },

    slugify: function(str) {
      var from  = "ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșšŝťțŭùúüűûñÿýçżźž",
          to    = "aaaaaaaaaccceeeeeghiiiijllnnoooooooossssttuuuuuunyyczzz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = makeString(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return trim(dasherize(str.replace(/[^\w\s-]/g, '-')), '-');
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str, quoteChar) {
      return _s.surround(str, quoteChar || '"');
    },

    unquote: function(str, quoteChar) {
      quoteChar = quoteChar || '"';
      if (str[0] === quoteChar && str[str.length-1] === quoteChar)
        return str.slice(1,str.length-1);
      else return str;
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      str = makeString(str);

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(str, qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    naturalCmp: function(str1, str2){
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;

      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1).match(cmpRegex),
        tokens2 = String(str2).match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

      for(var i = 0; i < count; i++) {
        var a = tokens1[i], b = tokens2[i];

        if (a !== b){
          var num1 = +a;
          var num2 = +b;
          if (num1 === num1 && num2 === num2){
            return num1 > num2 ? 1 : -1;
          }
          return a < b ? -1 : 1;
        }
      }

      if (tokens1.length != tokens2.length)
        return tokens1.length - tokens2.length;

      return str1 < str2 ? -1 : 1;
    },

    levenshtein: function(str1, str2) {
      str1 = makeString(str1); str2 = makeString(str2);

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
    },

    toBoolean: function(str, trueValues, falseValues) {
      if (typeof str === "number") str = "" + str;
      if (typeof str !== "string") return !!str;
      str = trim(str);
      if (boolMatch(str, trueValues || ["true", "1"])) return true;
      if (boolMatch(str, falseValues || ["false", "0"])) return false;
    }
  };

  // Aliases

  _s.strip    = trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;
  _s.toBool   = _s.toBoolean;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);
