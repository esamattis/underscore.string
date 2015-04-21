var equal = require('assert').equal;
var reverse = require('../reverse');


test('#reverse', function() {
  equal(reverse('foo'), 'oof' );
  equal(reverse('foobar'), 'raboof' );
  equal(reverse('foo bar'), 'rab oof' );
  equal(reverse('saippuakauppias'), 'saippuakauppias' );
  equal(reverse(123), '321', 'Non string');
  equal(reverse(123.45), '54.321', 'Non string');
  equal(reverse(''), '', 'reversing empty string returns empty string' );
  equal(reverse(null), '', 'reversing null returns empty string' );
  equal(reverse(undefined), '', 'reversing undefined returns empty string' );
});

