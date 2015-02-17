var equal = require('assert').equal;
var camelize = require('../camelize');


test('#camelize', function(){
  equal(camelize('the_camelize_string_method'), 'theCamelizeStringMethod');
  equal(camelize('webkit-transform'), 'webkitTransform');
  equal(camelize('-the-camelize-string-method'), 'TheCamelizeStringMethod');
  equal(camelize('_the_camelize_string_method'), 'TheCamelizeStringMethod');
  equal(camelize('The-camelize-string-method'), 'TheCamelizeStringMethod');
  equal(camelize('the camelize string method'), 'theCamelizeStringMethod');
  equal(camelize(' the camelize  string method'), 'theCamelizeStringMethod');
  equal(camelize('the camelize   string method'), 'theCamelizeStringMethod');
  equal(camelize(' with   spaces'), 'withSpaces');
  equal(camelize("_som eWeird---name-"), 'SomEWeirdName');
  equal(camelize(''), '', 'Camelize empty string returns empty string');
  equal(camelize(null), '', 'Camelize null returns empty string');
  equal(camelize(undefined), '', 'Camelize undefined returns empty string');
  equal(camelize(123), '123');
  equal(camelize('the_camelize_string_method', true), 'theCamelizeStringMethod');
  equal(camelize('webkit-transform', true), 'webkitTransform');
  equal(camelize('-the-camelize-string-method', true), 'theCamelizeStringMethod');
  equal(camelize('_the_camelize_string_method', true), 'theCamelizeStringMethod');
  equal(camelize('The-camelize-string-method', true), 'theCamelizeStringMethod');
  equal(camelize('the camelize string method', true), 'theCamelizeStringMethod');
  equal(camelize(' the camelize  string method', true), 'theCamelizeStringMethod');
  equal(camelize('the camelize   string method', true), 'theCamelizeStringMethod');
  equal(camelize(' with   spaces', true), 'withSpaces');
  equal(camelize("_som eWeird---name-", true), 'somEWeirdName');
  equal(camelize('', true), '', 'Camelize empty string returns empty string');
  equal(camelize(null, true), '', 'Camelize null returns empty string');
  equal(camelize(undefined, true), '', 'Camelize undefined returns empty string');
  equal(camelize(123, true), '123');
});

