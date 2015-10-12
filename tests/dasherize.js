var equal = require('assert').equal;
var dasherize = require('../dasherize');


test('#dasherize', function(){
  equal(dasherize('the_dasherize_string_method'), 'the-dasherize-string-method');
  equal(dasherize('TheDasherizeStringMethod'), '-the-dasherize-string-method');
  equal(dasherize('thisIsATest'), 'this-is-a-test');
  equal(dasherize('this Is A Test'), 'this-is-a-test');
  equal(dasherize('thisIsATest123'), 'this-is-a-test123');
  equal(dasherize('123thisIsATest'), '123this-is-a-test');
  equal(dasherize('the dasherize string method'), 'the-dasherize-string-method');
  equal(dasherize('the  dasherize string method  '), 'the-dasherize-string-method');
  equal(dasherize('téléphone'), 'téléphone');
  equal(dasherize('foo$bar'), 'foo$bar');
  equal(dasherize('input with a-dash'), 'input-with-a-dash');
  equal(dasherize(''), '');
  equal(dasherize(null), '');
  equal(dasherize(undefined), '');
  equal(dasherize(123), '123');
});

