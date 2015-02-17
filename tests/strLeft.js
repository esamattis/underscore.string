var equal = require('assert').equal;
var strLeft = require('../strLeft');


test('#strLeft', function() {
  equal(strLeft('This_is_a_test_string', '_'), 'This');
  equal(strLeft('This_is_a_test_string', 'This'), '');
  equal(strLeft('This_is_a_test_string'), 'This_is_a_test_string');
  equal(strLeft('This_is_a_test_string', ''), 'This_is_a_test_string');
  equal(strLeft('This_is_a_test_string', '-'), 'This_is_a_test_string');
  equal(strLeft('', 'foo'), '');
  equal(strLeft(null, 'foo'), '');
  equal(strLeft(undefined, 'foo'), '');
  equal(strLeft(123454321, 3), '12');
});

