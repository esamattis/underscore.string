var equal = require('assert').equal;
var strRight = require('../strRight');


test('#strRight', function() {
  equal(strRight('This_is_a_test_string', '_'), 'is_a_test_string');
  equal(strRight('This_is_a_test_string', 'string'), '');
  equal(strRight('This_is_a_test_string'), 'This_is_a_test_string');
  equal(strRight('This_is_a_test_string', ''), 'This_is_a_test_string');
  equal(strRight('This_is_a_test_string', '-'), 'This_is_a_test_string');
  equal(strRight('This_is_a_test_string', ''), 'This_is_a_test_string');
  equal(strRight('', 'foo'), '');
  equal(strRight(null, 'foo'), '');
  equal(strRight(undefined, 'foo'), '');
  equal(strRight(12345, 2), '345');
});

