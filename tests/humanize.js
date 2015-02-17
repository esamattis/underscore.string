var equal = require('assert').equal;
var humanize = require('../humanize');


test('#humanize', function(){
  equal(humanize('the_humanize_string_method'), 'The humanize string method');
  equal(humanize('ThehumanizeStringMethod'), 'Thehumanize string method');
  equal(humanize('-ThehumanizeStringMethod'), 'Thehumanize string method');
  equal(humanize('the humanize string method'), 'The humanize string method');
  equal(humanize('the humanize_id string method_id'), 'The humanize id string method');
  equal(humanize('the  humanize string method  '), 'The humanize string method');
  equal(humanize('   capitalize dash-CamelCase_underscore trim  '), 'Capitalize dash camel case underscore trim');
  equal(humanize(123), '123');
  equal(humanize(''), '');
  equal(humanize(null), '');
  equal(humanize(undefined), '');
});

