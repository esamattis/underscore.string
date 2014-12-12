//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.4.0'

// Import functions
import {sprintf, vsprintf} from "./helpers/sprintf";
import {isBlank} from "./is_blank";
import {stripTags} from "./strip_tags";
import {capitalize} from "./capitalize";
import {decapitalize} from "./decapitalize";
import {chop} from "./chop";
import {clean} from "./clean";
import {count} from "./count";
import {trim, ltrim, rtrim} from "./trim";
import {titleize} from "./titleize";
import {chars} from "./chars";
import {swapCase} from "./swap_case";
import {escapeHTML} from "./escape_html";
import {unescapeHTML} from "./unescape_html";
import {escapeRegExp} from "./escape_reg_exp";
import {splice} from "./splice";
import {insert} from "./insert";
import {include} from "./include";
import {join} from "./join";
import {lines} from "./lines";
import {reverse} from "./reverse";
import {startsWith} from "./starts_with";
import {endsWith} from "./ends_with";
import {succ} from "./succ";
import {camelize} from "./camelize";
import {underscored} from "./underscored";
import {dasherize} from "./dasherize";
import {classify} from "./classify";
import {humanize} from "./humanize";
import {truncate} from "./truncate";
import {prune} from "./prune";
import {words} from "./words";
import {pad, lpad, rpad, lrpad} from "./pad";
import {toNumber} from "./to_number";
import {numberFormat} from "./number_format";
import {strRight, strRightBack, strLeft, strLeftBack} from "./str_left_right";
import {slugify} from "./slugify";
import {surround} from "./surround";
import {quote, unquote} from "./quote";
import {_exports} from "./exports";
import {repeat} from "./repeat";
import {naturalCmp} from "./natural_cmp";
import {toSentence, toSentenceSerial} from "./to_sentence";
import {levenshtein} from "./levenshtein";
import {toBoolean} from "./to_boolean";

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
    lpad: lpad,
    rpad: rpad,
    lrpad: lrpad,
    sprintf: sprintf,
    vsprintf: vsprintf,
    toNumber: toNumber,
    numberFormat : numberFormat,
    strRight: strRight,
    strRightBack: strRightBack,
    strLeft: strLeft,
    strLeftBack: strLeftBack,
    toSentence: toSentence,
    toSentenceSerial: toSentenceSerial,
    slugify: slugify,
    surround: surround,
    quote: quote,
    unquote: unquote,
    exports: _exports,
    repeat: repeat,
    naturalCmp: naturalCmp,
    levenshtein: levenshtein,
    toBoolean: toBoolean
  };

  // Aliases

  _s.strip    = _s.trim;
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
