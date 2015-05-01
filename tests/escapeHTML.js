var equal = require('assert').equal;
var escapeHTML = require('../escapeHTML');


test('#escapeHTML', function(){
  equal(escapeHTML('<div>Blah & "blah" & \'blah\'</div>'), '&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &#39;blah&#39;&lt;/div&gt;');
  equal(escapeHTML('&lt;'), '&amp;lt;');
  equal(escapeHTML(' '), ' ');
  equal(escapeHTML('¢'), '&cent;')
  equal(escapeHTML('¢ £ ¥ € © ®'), '&cent; &pound; &yen; &euro; &copy; &reg;')
  equal(escapeHTML(5), '5');
  equal(escapeHTML(''), '');
  equal(escapeHTML(null), '');
  equal(escapeHTML(undefined), '');
});
