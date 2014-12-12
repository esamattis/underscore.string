//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.4.0'

// Import functions
import {sprintf, vsprintf} from "lib/helpers/sprintf";
import {isBlank} from "lib/is_blank";
import {stripTags} from "lib/strip_tags";
import {capitalize} from "lib/capitalize";
import {decapitalize} from "lib/decapitalize";
import {chop} from "lib/chop";
import {clean} from "lib/clean";
import {count} from "lib/count";
import {trim, ltrim, rtrim} from "lib/trim";
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
import {pad, lpad, rpad, lrpad} from "lib/pad";
import {toNumber} from "lib/to_number";
import {numberFormat} from "lib/number_format";
import {strRight, strRightBack, strLeft, strLeftBack} from "lib/str_left_right";
import {slugify} from "lib/slugify";
import {surround} from "lib/surround";
import {quote, unquote} from "lib/quote";
import {_exports} from "lib/exports";
import {repeat} from "lib/repeat";
import {naturalCmp} from "lib/natural_cmp";
import {toSentence, toSentenceSerial} from "lib/to_sentence";
import {levenshtein} from "lib/levenshtein";
import {toBoolean} from "lib/to_boolean";

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
