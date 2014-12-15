//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.4.0'

'use strict';

// Defining underscore.string
var _s = {
  VERSION: '2.4.0'
};

_s.isBlank          = require('./isBlank');
_s.stripTags        = require('./stripTags');
_s.capitalize       = require('./capitalize');
_s.decapitalize     = require('./decapitalize');
_s.chop             = require('./chop');
_s.trim             = require('./trim');
_s.clean            = require('./clean');
_s.count            = require('./count');
_s.chars            = require('./chars');
_s.swapCase         = require('./swapCase');
_s.escapeHTML       = require('./escapeHTML');
_s.unescapeHTML     = require('./unescapeHTML');
_s.splice           = require('./splice');
_s.insert           = require('./insert');
_s.include          = require('./include');
_s.join             = require('./join');
_s.lines            = require('./lines');
_s.reverse          = require('./reverse');
_s.startsWith       = require('./startsWith');
_s.endsWith         = require('./endsWith');
_s.succ             = require('./succ');
_s.titleize         = require('./titleize');
_s.camelize         = require('./camelize');
_s.underscored      = require('./underscored');
_s.dasherize        = require('./dasherize');
_s.classify         = require('./classify');
_s.humanize         = require('./humanize');
_s.ltrim            = require('./ltrim');
_s.rtrim            = require('./rtrim');
_s.truncate         = require('./truncate');
_s.prune            = require('./prune');
_s.words            = require('./words');
_s.pad              = require('./pad');
_s.lpad             = require('./lpad');
_s.rpad             = require('./rpad');
_s.lrpad            = require('./lrpad');
_s.sprintf          = require('./sprintf');
_s.vsprintf         = require('./vsprintf');
_s.toNumber         = require('./toNumber');
_s.numberFormat     = require('./numberFormat');
_s.strRight         = require('./strRight');
_s.strRightBack     = require('./strRightBack');
_s.strLeft          = require('./strLeft');
_s.strLeftBack      = require('./strLeftBack');
_s.toSentence       = require('./toSentence');
_s.toSentenceSerial = require('./toSentenceSerial');
_s.slugify          = require('./slugify');
_s.surround         = require('./surround');
_s.quote            = require('./quote');
_s.unquote          = require('./unquote');
_s.repeat           = require('./repeat');
_s.naturalCmp       = require('./naturalCmp');
_s.levenshtein      = require('./levenshtein');
_s.toBoolean        = require('./toBoolean');
_s.exports          = require('./exports');
_s.escapeRegExp     = require('./helper/escapeRegExp');

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
// Integrate with Underscore.js if defined
// or create our own underscore object.
global._ = global._ || {};
global._.string = global._.str = _s;
this._ = this._ || {};
this._.string = this._.str = _s;

// CommonJS module is defined
module.exports = _s;
exports._s = _s;
