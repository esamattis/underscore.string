var _ = require('underscore');
var equal = require('assert').equal;
var s = require('../dist/underscore.string');

test('#exports', function() {
  equal(_.intersection(Object.keys(s.exports()), _.functions(_)), [""],
    "Conflicts exist between exports and underscore functions"
  );
});
