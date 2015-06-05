var equal = require('assert').equal;
var splice = require('../splice');


test('#splice', function(){
  equal(splice('https://edtsech@bitbucket.org/edtsech/underscore.strings', 30, 7, 'epeli'),
         'https://edtsech@bitbucket.org/epeli/underscore.strings');
  equal(splice(12345, 1, 2, 321), '132145', 'Non strings');
});

