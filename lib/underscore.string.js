// Underscore.string
// (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
// Underscore.strings is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/edtsech/underscore.string
// Some code is borrowed from MooTools and Alexandru Marasteanu.

// Version 1.1.5

'use strict';
(function(root){
    // ------------------------- Baseline setup ---------------------------------

    var nativeTrim = String.prototype.trim;
    
    var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    var parseNumber = function(source) { return source * 1 || 0; };

    var strRepeat = function(i, m) {
        for (var o = []; m > 0; o[--m] = i);
        return o.join('');
    };
    
    var slice = function(a){
        return Array.prototype.slice.call(a);
    };

    var defaultToWhiteSpace = function(characters){
        if (characters) {
            return _s.escapeRegExp(characters);
        }
        return '\\s';
    };
    
    
    // ------------------------- URL regexp ---------------------------------
    
    var urlRegex = (function(){
        var alpha         = 'a-z',
            // scheme     = '['+alpha+'][-+.'+alpha+'\\d]*',
            alnum         = alpha + '\\d',
            hex           = 'a-f\\d',
            unreserved    = '-_.!~*\'()' + alnum,
            reserved      = ';/?:@&=+$,\\[\\]',
            escaped       = '%['+hex+']{2}',
            uric          = '(?:['+unreserved+reserved+']|'+escaped+')',
            userinfo      = '(?:['+unreserved+';:&=+$,]|'+escaped+')*',
            domlabel      = '(?:['+alnum+'](?:[-'+alnum+']*['+alnum+'])?)',
            toplabel      = '(?:['+alpha+'](?:[-'+alnum+']*['+alnum+'])?)',
            ipv4addr      = '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
            hex4          = '['+hex+']{1,4}',
            lastpart      = '(?:'+hex4+'|'+ipv4addr+')',
            hexseq1       = '(?:'+hex4+':)*'+hex4,
            hexseq2       = '(?:'+hex4+':)*'+lastpart,
            ipv6addr      = '(?:'+hexseq2+'|(?:'+hexseq1+')?::(?:'+hexseq2+')?)',
            ipv6ref       = '\\['+ipv6addr+'\\]',
            hostname      = '(?:'+domlabel+'\\.)*'+toplabel+'\\.?',
            host          = '(?:'+hostname+'|'+ipv4addr+'|'+ipv6ref+')',
            reg_name      = '(?:['+unreserved+'$,;:@&=+]|'+escaped+')+',
            pchar         = '(?:['+unreserved+':@&=+$,]|'+escaped+')',
            param         = pchar+'*',
            segment       = pchar+'*(?:;'+param+')*',
            path_segments = segment+'(?:/'+segment+')*',
            path          = '/'+path_segments,
            query         = uric+'*',
            fragment      = query,
            port          = '\\:\\d+',
            authority     = '(?:'+userinfo + '@)?' + host + '(?:'+port+')?';
          
        function makeSchemes(schemes){
            return '(?:'+schemes.join('|')+')://';
        }
        
        var defaultSchemes = '(?:' + makeSchemes(['http', 'https']) + '|//)';
          
        return function(schemes){
            var scheme = schemes && schemes.length ? makeSchemes(schemes) : defaultSchemes,
                regexStr = '^' + scheme + authority + '(?:'+path+')?' + '(?:\\?'+query+')?' + '(?:#'+fragment+')?$';
            return new RegExp(regexStr, 'i');
        };
    })();
    
    var defaultUrlRegex = urlRegex();

    var _s = {
      
        isURL: function(){
            var schemes = slice(arguments),
                str = schemes.shift(),
                regex = schemes.length ? urlRegex(schemes) : defaultUrlRegex;
              
            return regex.test(str);
        },

        isBlank: function(str){
            return str == false;
        },
        
        isEmail: function(str){
            return emailRegex.test(str);
        },
        
        stripTags: function(str){
            return str.replace(/<\/?[^>]+>/ig, '');
        },

        capitalize : function(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        },

        chop: function(str, step){
            step = step || str.length;
            var arr = [];
            for (var i = 0; i < str.length;) {
                arr.push(str.slice(i,i + step));
                i = i + step;
            }
            return arr;
        },

        clean: function(str){
            return _s.strip(str.replace(/\s+/g, ' '));
        },

        count: function(str, substr){
            var count = 0, index;
            for (var i=0; i < str.length;) {
                index = str.indexOf(substr, i);
                index >= 0 && count++;
                i = i + (index >= 0 ? index : 0) + substr.length;
            }
            return count;
        },

        chars: function(str) {
            return str.split('');
        },

        escapeHTML: function(str) {
            return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                                  .replace(/"/g, '&quot;').replace(/'/g, "&apos;");
        },

        unescapeHTML: function(str) {
            return String(str||'').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                                  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
        },

        escapeRegExp: function(str){
            // From MooTools core 1.2.4
            return String(str||'').replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
        },

        insert: function(str, i, substr){
            var arr = str.split('');
            arr.splice(i, 0, substr);
            return arr.join('');
        },

        includes: function(str, needle){
            return str.indexOf(needle) !== -1;
        },

        join: function(sep) {
            var args = slice(arguments);
            return args.join(args.shift());
        },

        lines: function(str) {
            return str.split("\n");
        },

        reverse: function(str){
            return Array.prototype.reverse.apply(str.split('')).join('');
        },

        splice: function(str, i, howmany, substr){
            var arr = str.split('');
            arr.splice(i, howmany, substr);
            return arr.join('');
        },

        startsWith: function(str, starts){
            return str.length >= starts.length && str.substring(0, starts.length) === starts;
        },

        endsWith: function(str, ends){
            return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
        },

        succ: function(str){
            var arr = str.split('');
            arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
            return arr.join('');
        },

        titleize: function(str){
            var arr = str.split(' '),
                word;
            for (var i=0; i < arr.length; i++) {
                word = arr[i].split('');
                if(typeof word[0] !== 'undefined') word[0] = word[0].toUpperCase();
                i+1 === arr.length ? arr[i] = word.join('') : arr[i] = word.join('') + ' ';
            }
            return arr.join('');
        },

        camelize: function(str){
            return _s.trim(str).replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
              return chr ? chr.toUpperCase() : '';
            });
        },

        underscored: function(str){
            return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/\-|\s+/g, '_').toLowerCase();
        },

        dasherize: function(str){
            return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1-$2').replace(/^([A-Z]+)/, '-$1').replace(/\_|\s+/g, '-').toLowerCase();
        },

        trim: function(str, characters){
            if (!characters && nativeTrim) {
                return nativeTrim.call(str);
            }
            characters = defaultToWhiteSpace(characters);
            return str.replace(new RegExp('\^[' + characters + ']+|[' + characters + ']+$', 'g'), '');
        },

        ltrim: function(str, characters){
            characters = defaultToWhiteSpace(characters);
            return str.replace(new RegExp('\^[' + characters + ']+', 'g'), '');
        },

        rtrim: function(str, characters){
            characters = defaultToWhiteSpace(characters);
            return str.replace(new RegExp('[' + characters + ']+$', 'g'), '');
        },

        truncate: function(str, length, truncateStr){
            truncateStr = truncateStr || '...';
            return str.length > length ? str.slice(0,length) + truncateStr : str;
        },

        words: function(str, delimiter) {
            delimiter = delimiter || " ";
            return str.split(delimiter);
        },


        pad: function(str, length, padStr, type) {

            var padding = '';
            var padlen  = 0;

            if (!padStr) { padStr = ' '; }
            else if (padStr.length > 1) { padStr = padStr[0]; }
            switch(type) {
                case "right":
                    padlen = (length - str.length);
                    padding = strRepeat(padStr, padlen);
                    str = str+padding;
                    break;
                case "both":
                    padlen = (length - str.length);
                    padding = {
                        'left' : strRepeat(padStr, Math.ceil(padlen/2)),
                        'right': strRepeat(padStr, Math.floor(padlen/2))
                    };
                    str = padding.left+str+padding.right;
                    break;
                default: // "left"
                    padlen = (length - str.length);
                    padding = strRepeat(padStr, padlen);;
                    str = padding+str;
            }
            return str;
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


        /**
         * Credits for this function goes to
         * http://www.diveintojavascript.com/projects/sprintf-for-javascript
         *
         * Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
         * All rights reserved.
         * */
        sprintf: function(){

            var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
            while (f) {
                if (m = /^[^\x25]+/.exec(f)) {
                    o.push(m[0]);
                }
                else if (m = /^\x25{2}/.exec(f)) {
                    o.push('%');
                }
                else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
                    if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
                        throw new Error('Too few arguments.');
                    }
                    if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
                        throw new TypeError('Expecting number but found ' + typeof(a));
                    }
                    switch (m[7]) {
                        case 'b': a = a.toString(2); break;
                        case 'c': a = String.fromCharCode(a); break;
                        case 'd': a = parseInt(a); break;
                        case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
                        case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
                        case 'o': a = a.toString(8); break;
                        case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
                        case 'u': a = Math.abs(a); break;
                        case 'x': a = a.toString(16); break;
                        case 'X': a = a.toString(16).toUpperCase(); break;
                    }
                    a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
                    c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
                    x = m[5] - String(a).length - s.length;
                    p = m[5] ? strRepeat(c, x) : '';
                    o.push(s + (m[4] ? a + p : p + a));
                }
                else {
                    throw new Error('Universe error: 17');
                }
                f = f.substring(m[0].length);
            }
            return o.join('');
        },

        toNumber: function(str, decimals) {
            return parseNumber(parseNumber(str).toFixed(parseNumber(decimals)));
        },

        strRight: function(sourceStr, sep){
            var pos =  (!sep) ? -1 : sourceStr.indexOf(sep);
            return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
        },

        strRightBack: function(sourceStr, sep){
            var pos =  (!sep) ? -1 : sourceStr.lastIndexOf(sep);
            return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
        },

        strLeft: function(sourceStr, sep){
            var pos = (!sep) ? -1 : sourceStr.indexOf(sep);
            return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
        },

        strLeftBack: function(sourceStr, sep){
            var pos = sourceStr.lastIndexOf(sep);
            return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
        }

    };

    // Aliases

    _s.isUrl  = _s.isURL;
    _s.strip  = _s.trim;
    _s.lstrip = _s.ltrim;
    _s.rstrip = _s.rtrim;
    _s.center = _s.lrpad;
    _s.ljust  = _s.lpad;
    _s.rjust  = _s.rpad;

    // CommonJS module is defined
    if (typeof window === 'undefined' && typeof module !== 'undefined') {
        // Export module
        module.exports = _s;

    // Integrate with Underscore.js
    } else if (typeof root._ !== 'undefined') {
        root._.mixin(_s);

    // Or define it
    } else {
        root._ = _s;
    }

}(this || window));
