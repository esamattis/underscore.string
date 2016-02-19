var _ = require('underscore');
var equal = require('assert').equal;
var exports = require('../exports');

test('#exports', function() {
  equal(_.intersection(Object.keys(exports()), _.functions(_)), [""],
    "Conflicts exist between exports and underscore functions"
  );
});
