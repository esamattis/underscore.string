var equal = require('assert').equal;
var strLeftBack = require('../strLeftBack');


test('#strLeftBack', function() {
  equal(strLeftBack('This_is_a_test_string', '_'), 'This_is_a_test');
  equal(strLeftBack('This_is_a_test_string', 'This'), '');
  equal(strLeftBack('This_is_a_test_string'), 'This_is_a_test_string');
  equal(strLeftBack('This_is_a_test_string', ''), 'This_is_a_test_string');
  equal(strLeftBack('This_is_a_test_string', '-'), 'This_is_a_test_string');
  equal(strLeftBack('', 'foo'), '');
  equal(strLeftBack(null, 'foo'), '');
  equal(strLeftBack(undefined, 'foo'), '');
  equal(strLeftBack(123454321, 3), '123454');
});

