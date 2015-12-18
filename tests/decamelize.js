var equal = require('assert').equal;
var decamelize = require('../decamelize');


test('#decamelize', function(){
  equal(decamelize('theDecamelizeStringMethod'), 'the_decamelize_string_method');
  equal(decamelize('webkitTransform', '-'), 'webkit-transform');
  equal(decamelize('theDecamelizeStringMethod_', ''), 'thedecamelizestringmethod_');
  equal(decamelize('TheDecamelizeStringMethod', '-'), 'the-decamelize-string-method');
  equal(decamelize(''), '', 'Decamelize empty string returns empty string');
  equal(decamelize(null), '', 'Decamelize null returns empty string');
  equal(decamelize(undefined), '', 'Decamelize undefined returns empty string');
  equal(decamelize(123), '123');
});

