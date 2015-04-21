var equal = require('assert').equal;
var decapitalize = require('../decapitalize');


test('#decapitalize', function() {
  equal(decapitalize('Fabio'), 'fabio', 'First letter is lower case');
  equal(decapitalize('Fabio'), 'fabio', 'First letter is lower case');
  equal(decapitalize('FOO'), 'fOO', 'Other letters unchanged');
  equal(decapitalize(123), '123', 'Non string');
  equal(decapitalize(''), '', 'Decapitalizing empty string returns empty string');
  equal(decapitalize(null), '', 'Decapitalizing null returns empty string');
  equal(decapitalize(undefined), '', 'Decapitalizing undefined returns empty string');
});

