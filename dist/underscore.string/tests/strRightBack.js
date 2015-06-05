var equal = require('assert').equal;
var strRightBack = require('../strRightBack');


test('#strRightBack', function() {
  equal(strRightBack('This_is_a_test_string', '_'), 'string');
  equal(strRightBack('This_is_a_test_string', 'string'), '');
  equal(strRightBack('This_is_a_test_string'), 'This_is_a_test_string');
  equal(strRightBack('This_is_a_test_string', ''), 'This_is_a_test_string');
  equal(strRightBack('This_is_a_test_string', '-'), 'This_is_a_test_string');
  equal(strRightBack('', 'foo'), '');
  equal(strRightBack(null, 'foo'), '');
  equal(strRightBack(undefined, 'foo'), '');
  equal(strRightBack(12345, 2), '345');
});

