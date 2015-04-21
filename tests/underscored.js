var equal = require('assert').equal;
var underscored = require('../underscored');


test('#underscored', function(){
  equal(underscored('the-underscored-string-method'), 'the_underscored_string_method');
  equal(underscored('theUnderscoredStringMethod'), 'the_underscored_string_method');
  equal(underscored('TheUnderscoredStringMethod'), 'the_underscored_string_method');
  equal(underscored(' the underscored  string method'), 'the_underscored_string_method');
  equal(underscored(''), '');
  equal(underscored(null), '');
  equal(underscored(undefined), '');
  equal(underscored(123), '123');
});

