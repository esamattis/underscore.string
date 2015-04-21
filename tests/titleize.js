var equal = require('assert').equal;
var titleize = require('../titleize');


test('#titleize', function(){
  equal(titleize('the titleize string method'), 'The Titleize String Method');
  equal(titleize('the titleize string  method'), 'The Titleize String  Method');
  equal(titleize(''), '', 'Titleize empty string returns empty string');
  equal(titleize(null), '', 'Titleize null returns empty string');
  equal(titleize(undefined), '', 'Titleize undefined returns empty string');
  equal(titleize('let\'s have some fun'), 'Let\'s Have Some Fun');
  equal(titleize('a-dash-separated-string'), 'A-Dash-Separated-String');
  equal(titleize('A-DASH-SEPARATED-STRING'), 'A-Dash-Separated-String');
  equal(titleize(123), '123');
});

