// Underscore.string
// (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
// Underscore.strings is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/epeli/underscore.string
// Some code is borrowed from MooTools and Alexandru Marasteanu.

// Version 2.2.0rc

!function(root){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var replace = function(str, pattern, something){
    return (''+str).replace(pattern, something);
  }

  var defaultToWhiteSpace = function(characters){
    if (characters != null) {
      return '[' + _s.escapeRegExp(characters) + ']';
    }
    return '\\s';
  };

  var levenshtein = function(str1, str2) {
    str1 += ''; str2 += '';

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

  var diacritics = {
    A : /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,
    AA: /[\uA732]/g,
    AE: /[\u00C6\u01FC\u01E2]/g,
    AO: /[\uA734]/g,
    AU: /[\uA736]/g,
    AV: /[\uA738\uA73A]/g,
    AY: /[\uA73C]/g,
    B : /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g,
    C : /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,
    D : /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g,
    DZ: /[\u01F1\u01C4]/g,
    Dz: /[\u01F2\u01C5]/g,
    E : /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g,
    F : /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g,
    G : /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g,
    H : /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g,
    I : /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g,
    J : /[\u004A\u24BF\uFF2A\u0134\u0248]/g,
    K : /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g,
    L : /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g,
    LJ: /[\u01C7]/g,
    Lj: /[\u01C8]/g,
    M : /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g,
    N : /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g,
    NJ: /[\u01CA]/g,
    Nj: /[\u01CB]/g,
    O : /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
    OI: /[\u01A2]/g,
    OO: /[\uA74E]/g,
    OU: /[\u0222]/g,
    P : /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g,
    Q : /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g,
    R : /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g,
    S : /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g,
    T : /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,
    TZ: /[\uA728]/g,
    U : /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g,
    V : /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g,
    VY: /[\uA760]/g,
    W : /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,
    X : /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g,
    Y : /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,
    Z : /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g,
    a : /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,
    aa: /[\uA733]/g,
    ae: /[\u00E6\u01FD\u01E3]/g,
    ao: /[\uA735]/g,
    au: /[\uA737]/g,
    av: /[\uA739\uA73B]/g,
    ay: /[\uA73D]/g,
    b : /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g,
    c : /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,
    d : /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g,
    dz: /[\u01F3\u01C6]/g,
    e : /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g,
    f : /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g,
    g : /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g,
    h : /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g,
    hv: /[\u0195]/g,
    i : /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g,
    j : /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g,
    k : /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g,
    l : /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g,
    lj: /[\u01C9]/g,
    m : /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g,
    n : /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g,
    nj: /[\u01CC]/g,
    oi: /[\u01A3]/g,
    ou: /[\u0223]/g ,
    oo: /[\uA74F]/g,
    p : /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g,
    q : /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g,
    r : /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g,
    s : /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g,
    t : /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g,
    tz: /[\uA729]/g,
    u : /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g,
    v : /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g,
    vy: /[\uA761]/g,
    w : /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g,
    x : /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g,
    y : /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g,
    z : /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
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

  var _s = {

    VERSION: '2.2.0rc',

    isBlank: function(str){
      return (/^\s*$/).test(str);
    },

    replaceDiacritics: function(str) {
      for(var letter in diacritics)
        str = replace(str, diacritics[letter], letter);

      return str;
    },

    stripTags: function(str){
      return replace(str, /<\/?[^>]+>/g, '');
    },

    capitalize : function(str) {
      str += '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      str += ''; step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      str += ''; substr += '';
      return str.split(substr).length - 1;
    },

    chars: function(str) {
      return (''+str).split('');
    },

    swapCase: function(str) {
      return replace(str, /./g, function(ch){
        return ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase();
      });
    },
	
    escapeHTML: function(str) {
      return replace(str, /[&<>"']/g, function(match){ return '&' + reversedEscapeChars[match] + ';'; });
    },

    unescapeHTML: function(str) {
      return replace(str, /\&([^;]+);/g, function(entity, entityCode){
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
    },

    escapeRegExp: function(str){
      // From MooTools core 1.2.4
      return replace(str, /([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    insert: function(str, i, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, 0, ''+substr);
      return arr.join('');
    },

    include: function(str, needle){
      return !!~(''+str).indexOf(needle);
    },

    join: function() {
      var args = slice.call(arguments);
      return args.join(args.shift());
    },

    lines: function(str) {
      return (''+str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    startsWith: function(str, starts){
      str += ''; starts += '';
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      str += ''; ends += '';
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      str += '';
      var arr = _s.chars(str);
      arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
      return arr.join('');
    },

    titleize: function(str){
      return replace(str, /(?:^|\s)\S/g, function(ch){ return ch.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, ch){ return ch.toUpperCase(); });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(replace(str, /_/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      str += '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      str += '';
      if (!characters && nativeTrimLeft) {
        return nativeTrimLeft.call(str);
      }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      str += '';
      if (!characters && nativeTrimRight) {
        return nativeTrimRight.call(str);
      }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      str += ''; truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/sergiokas
     */
    prune: function(str, length, pruneStr){
      str += ''; length = ~~length;
      pruneStr = pruneStr != null ? ''+pruneStr : '...';
      
      var pruned, borderChar, template = str.replace(/\W/g, function(ch){
        return (ch.toUpperCase() !== ch.toLowerCase()) ? 'A' : ' ';
      });
      
      borderChar = template.charAt(length);
      
      pruned = template.slice(0, length);
      
      // Check if we're in the middle of a word
      if (borderChar && borderChar.match(/\S/))
        pruned = pruned.replace(/\s\S+$/, '');
        
      pruned = _s.rtrim(pruned);
      
      return (pruned+pruneStr).length > str.length ? str : str.slice(0, pruned.length)+pruneStr;
    },

    words: function(str, delimiter) {
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str += '';
      
      var padlen  = 0;

      length = ~~length;
      
      if (!padStr) {
        padStr = ' ';
      } else if (padStr.length > 1) {
        padStr = padStr.charAt(0);
      }
      
      switch(type) {
        case 'right':
          padlen = (length - str.length);
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = (length - str.length);
          return strRepeat(padStr, Math.ceil(padlen/2)) + 
                 str + 
                 strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = (length - str.length);
          return strRepeat(padStr, padlen) + str;
        }
    },

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
      str += '';
      var num = parseNumber(parseNumber(str).toFixed(~~decimals));
      return num === 0 && !str.match(/^0+$/) ? Number.NaN : num;
    },

    strRight: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator) {
        separator || (separator = ', ');
        lastSeparator || (lastSeparator = ' and ');
        var length = array.length, str = '';

        for (var i = 0; i < length; i++) {
            str += array[i];
            if (i === (length - 2)) { str += lastSeparator; }
            else if (i < (length - 1)) { str += separator; }
        }

        return str;
    },

    slugify: function(str) {
      var from  = "ąàáäâãćęèéëêìíïîłńòóöôõùúüûñçżź",
          to    = "aaaaaaceeeeeiiiilnooooouuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = (''+str).toLowerCase();

      str = str.replace(regex, function(ch){
        var index = from.indexOf(ch);
        return to.charAt(index) || '-';
      });
      
      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str) {
      return _s.surround(str, '"');
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
      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(str+'', qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    levenshtein: levenshtein
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

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      // Export module
      module.exports = _s;
    }
    exports._s = _s;

  } else if (typeof define === 'function' && define.amd) {
    // Register as a named module with AMD.
    define('underscore.string', function() {
      return _s;
    });
    
  } else {
    // Integrate with Underscore.js if defined
    // or create our own underscore object.
    root._ = root._ || {};
    root._.string = root._.str = _s;
  }

}(this);
