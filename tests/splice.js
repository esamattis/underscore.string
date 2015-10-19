var equal = require('assert').equal;
var splice = require('../splice');


test('#splice', function(){
  equal(splice('https://edtsech@bitbucket.org/edtsech/underscore.strings', 30, 7, 'epeli'),
         'https://edtsech@bitbucket.org/epeli/underscore.strings');
  equal(splice(12345, 1, 2, 321), '132145', 'Non strings');
  equal(splice('string', 0, 1), 'tring', 'splice with no substring')
  equal(splice(null, 0, 1, 'substring'), 'substring', 'splice on null')
  equal(splice(null, 0, 1), '', 'splice on null with no substring')
  equal(splice(undefined, 0, 1, 'substring'), 'substring', 'splice on undefined')
  equal(splice(undefined, 0, 1), '', 'splice on undefined with no substring')
});

