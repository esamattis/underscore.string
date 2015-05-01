var equal = require('assert').equal;
var unescapeHTML = require('../unescapeHTML');


test('#unescapeHTML', function(){
  equal(unescapeHTML('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&#39;&lt;/div&gt;'),
           '<div>Blah & "blah" & \'blah\'</div>');
  equal(unescapeHTML('&amp;lt;'), '&lt;');
  equal(unescapeHTML('&apos;'), '\'');
  equal(unescapeHTML('&#39;'), '\'');
  equal(unescapeHTML('&#0039;'), '\'');
  equal(unescapeHTML('&#x4a;'), 'J');
  equal(unescapeHTML('&#x04A;'), 'J');
  equal(unescapeHTML('&#X4A;'), '&#X4A;');
  equal(unescapeHTML('&_#39;'), '&_#39;');
  equal(unescapeHTML('&#39_;'), '&#39_;');
  equal(unescapeHTML('&amp;#38;'), '&#38;');
  equal(unescapeHTML('&#38;amp;'), '&amp;');
  equal(unescapeHTML('&#39;'), "'");
  equal(unescapeHTML(''), '');
  equal(unescapeHTML('&nbsp;'), ' ');
  equal(unescapeHTML('what is the &yen; to &pound; to &euro; conversion process?'), 'what is the ¥ to £ to € conversion process?');
  equal(unescapeHTML('&reg; trademark'), '® trademark');
  equal(unescapeHTML('&copy; 1992. License available for 50 &cent;'), '© 1992. License available for 50 ¢');
  equal(unescapeHTML('&nbsp;'), ' ');
  equal(unescapeHTML('&nbsp;'), ' ');

  equal(unescapeHTML(null), '');
  equal(unescapeHTML(undefined), '');
  equal(unescapeHTML(5), '5');
});
