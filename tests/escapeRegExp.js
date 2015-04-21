var equal = require('assert').equal;
var escapeRegExp = require('../helper/escapeRegExp');


test('#escapeRegExp', function(){
  equal(escapeRegExp(/hello(?=\sworld)/.source), 'hello\\(\\?\\=\\\\sworld\\)', 'with lookahead');
  equal(escapeRegExp(/hello(?!\shell)/.source), 'hello\\(\\?\\!\\\\shell\\)', 'with negative lookahead');
});

