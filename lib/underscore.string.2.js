//    Underscore.string
//    (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//    Underscore.string is freely distributable under the terms of the MIT license.
//    Documentation: https://github.com/epeli/underscore.string
//    Some code is borrowed from MooTools and Alexandru Marasteanu.
//    Version 2.3.0

(function (root) {
  'use strict';

  var StringProto = String.prototype, ArrayProto = Array.prototype;

  var nativeTrim = StringProto.trim,
    nativeTrimRight = StringProto.trimRight,
    nativeTrimLeft = StringProto.trimLeft;

  var slice = ArrayProto.slice;

  var getType = function (obj) { return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase(); };

  var strRepeat = function (str, qty) {
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1;
      str += str;
    }
    return result;
  };

  var sprintf = (function () {
    var cache = {},
      format = function (parseTree, argv) {
        var cursor = 1,
          treeLength = parseTree.length,
          nodeType = '',
          arg,
          output = [],
          i,
          k,
          match,
          pad,
          padCharacter,
          padLength;
      };
  }());
//     var str_format = function() {
//       if (!str_format.cache.hasOwnProperty(arguments[0])) {
//         str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
//       }
//       return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
//     };

//     str_format.format = function(parse_tree, argv) {
//       var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
//       for (i = 0; i < tree_length; i++) {
//         node_type = get_type(parse_tree[i]);
//         if (node_type === 'string') {
//           output.push(parse_tree[i]);
//         }
//         else if (node_type === 'array') {
//           match = parse_tree[i]; // convenience purposes only
//           if (match[2]) { // keyword argument
//             arg = argv[cursor];
//             for (k = 0; k < match[2].length; k++) {
//               if (!arg.hasOwnProperty(match[2][k])) {
//                 throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
//               }
//               arg = arg[match[2][k]];
//             }
//           } else if (match[1]) { // positional argument (explicit)
//             arg = argv[match[1]];
//           }
//           else { // positional argument (implicit)
//             arg = argv[cursor++];
//           }

//           if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
//             throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
//           }
//           switch (match[8]) {
//             case 'b': arg = arg.toString(2); break;
//             case 'c': arg = String.fromCharCode(arg); break;
//             case 'd': arg = parseInt(arg, 10); break;
//             case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
//             case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
//             case 'o': arg = arg.toString(8); break;
//             case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
//             case 'u': arg = Math.abs(arg); break;
//             case 'x': arg = arg.toString(16); break;
//             case 'X': arg = arg.toString(16).toUpperCase(); break;
//           }
//           arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
//           pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
//           pad_length = match[6] - String(arg).length;
//           pad = match[6] ? str_repeat(pad_character, pad_length) : '';
//           output.push(match[5] ? arg + pad : pad + arg);
//         }
//       }
//       return output.join('');
//     };

//     str_format.cache = {};

//     str_format.parse = function(fmt) {
//       var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
//       while (_fmt) {
//         if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
//           parse_tree.push(match[0]);
//         }
//         else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
//           parse_tree.push('%');
//         }
//         else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
//           if (match[2]) {
//             arg_names |= 1;
//             var field_list = [], replacement_field = match[2], field_match = [];
//             if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
//               field_list.push(field_match[1]);
//               while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
//                 if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
//                   field_list.push(field_match[1]);
//                 }
//                 else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
//                   field_list.push(field_match[1]);
//                 }
//                 else {
//                   throw new Error('[_.sprintf] huh?');
//                 }
//               }
//             }
//             else {
//               throw new Error('[_.sprintf] huh?');
//             }
//             match[2] = field_list;
//           }
//           else {
//             arg_names |= 2;
//           }
//           if (arg_names === 3) {
//             throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
//           }
//           parse_tree.push(match);
//         }
//         else {
//           throw new Error('[_.sprintf] huh?');
//         }
//         _fmt = _fmt.substring(match[0].length);
//       }
//       return parse_tree;
//     };

//     return str_format;
//   })();








}(this));