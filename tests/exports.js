var _ = require('underscore');
var deepEqual = require('assert').deepEqual;
var s = require('../');

test('#exports', function() {
  deepEqual(_.intersection(Object.keys(s.exports()), _.functions(_)), [],
    'Conflicts exist between exports and underscore functions'
  );
});
