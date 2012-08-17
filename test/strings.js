$(document).ready(function() {

  // Include Underscore.string methods to Underscore namespace
  _.mixin(_.str.exports());

  module('String extensions');

  test('Strings: trim', function() {
    equals(_.trim(123), '123', 'Non string');
    equals(_(' foo').trim(), 'foo');
    equals(_('foo ').trim(), 'foo');
    equals(_(' foo ').trim(), 'foo');
    equals(_('    foo     ').trim(), 'foo');
    equals(_('    foo     ').trim(' '), 'foo', 'Manually set whitespace');
    equals(_('\t    foo \t  ').trim(/\s/), 'foo', 'Manually set RegExp /\\s+/');

    equals(_('ffoo').trim('f'), 'oo');
    equals(_('ooff').trim('f'), 'oo');
    equals(_('ffooff').trim('f'), 'oo');


    equals(_('_-foobar-_').trim('_-'), 'foobar');

    equals(_('http://foo/').trim('/'), 'http://foo');
    equals(_('c:\\').trim('\\'), 'c:');

    equals(_(123).trim(), '123');
    equals(_(123).trim(3), '12');
    equals(_('').trim(), '', 'Trim empty string should return empty string');
    equals(_(null).trim(), '', 'Trim null should return empty string');
    equals(_(undefined).trim(), '', 'Trim undefined should return empty string');
  });

  test('String: levenshtein', function() {
    equals(_.levenshtein('Godfather', 'Godfather'), 0);
    equals(_.levenshtein('Godfather', 'Godfathe'), 1);
    equals(_.levenshtein('Godfather', 'odfather'), 1);
    equals(_.levenshtein('Godfather', 'Gdfthr'), 3);
    equals(_.levenshtein('seven', 'eight'), 5);
    equals(_.levenshtein('123', 123), 0);
    equals(_.levenshtein(321, '321'), 0);
    equals(_.levenshtein('lol', null), 3);
    equals(_.levenshtein('lol'), 3);
    equals(_.levenshtein(null, 'lol'), 3);
    equals(_.levenshtein(undefined, 'lol'), 3);
    equals(_.levenshtein(), 0);
  });

  test('Strings: ltrim', function() {
    equals(_(' foo').ltrim(), 'foo');
    equals(_('    foo').ltrim(), 'foo');
    equals(_('foo ').ltrim(), 'foo ');
    equals(_(' foo ').ltrim(), 'foo ');
    equals(_('').ltrim(), '', 'ltrim empty string should return empty string');
    equals(_(null).ltrim(), '', 'ltrim null should return empty string');
    equals(_(undefined).ltrim(), '', 'ltrim undefined should return empty string');

    equals(_('ffoo').ltrim('f'), 'oo');
    equals(_('ooff').ltrim('f'), 'ooff');
    equals(_('ffooff').ltrim('f'), 'ooff');

    equals(_('_-foobar-_').ltrim('_-'), 'foobar-_');

    equals(_(123).ltrim(1), '23');
  });

  test('Strings: rtrim', function() {
    equals(_('http://foo/').rtrim('/'), 'http://foo', 'clean trailing slash');
    equals(_(' foo').rtrim(), ' foo');
    equals(_('foo ').rtrim(), 'foo');
    equals(_('foo     ').rtrim(), 'foo');
    equals(_('foo  bar     ').rtrim(), 'foo  bar');
    equals(_(' foo ').rtrim(), ' foo');

    equals(_('ffoo').rtrim('f'), 'ffoo');
    equals(_('ooff').rtrim('f'), 'oo');
    equals(_('ffooff').rtrim('f'), 'ffoo');

    equals(_('_-foobar-_').rtrim('_-'), '_-foobar');

    equals(_(123).rtrim(3), '12');
    equals(_('').rtrim(), '', 'rtrim empty string should return empty string');
    equals(_(null).rtrim(), '', 'rtrim null should return empty string');
  });

  test('Strings: capitalize', function() {
    equals(_('fabio').capitalize(), 'Fabio', 'First letter is upper case');
    equals(_.capitalize('fabio'), 'Fabio', 'First letter is upper case');
    equals(_.capitalize('FOO'), 'FOO', 'Other letters unchanged');
    equals(_(123).capitalize(), '123', 'Non string');
    equals(_.capitalize(''), '', 'Capitalizing empty string returns empty string');
    equals(_.capitalize(null), '', 'Capitalizing null returns empty string');
    equals(_.capitalize(undefined), '', 'Capitalizing undefined returns empty string');
  });

  test('Strings: join', function() {
    equals(_.join('', 'foo', 'bar'), 'foobar', 'basic join');
    equals(_.join('', 1, 'foo', 2), '1foo2', 'join numbers and strings');
    equals(_.join(' ','foo', 'bar'), 'foo bar', 'join with spaces');
    equals(_.join('1', '2', '2'), '212', 'join number strings');
    equals(_.join(1, 2, 2), '212', 'join numbers');
    equals(_.join('','foo', null), 'foo', 'join null with string returns string');
    equals(_.join(null,'foo', 'bar'), 'foobar', 'join strings with null returns string');
    equals(_(' ').join('foo', 'bar'), 'foo bar', 'join object oriented');
  });

  test('Strings: reverse', function() {
    equals(_.str.reverse('foo'), 'oof' );
    equals(_.str.reverse('foobar'), 'raboof' );
    equals(_.str.reverse('foo bar'), 'rab oof' );
    equals(_.str.reverse('saippuakauppias'), 'saippuakauppias' );
    equals(_.str.reverse(123), '321', 'Non string');
    equals(_.str.reverse(123.45), '54.321', 'Non string');
    equals(_.str.reverse(''), '', 'reversing empty string returns empty string' );
    equals(_.str.reverse(null), '', 'reversing null returns empty string' );
    equals(_.str.reverse(undefined), '', 'reversing undefined returns empty string' );
  });

  test('Strings: clean', function() {
    equals(_(' foo    bar   ').clean(), 'foo bar');
    equals(_(123).clean(), '123');
    equals(_('').clean(), '', 'claning empty string returns empty string');
    equals(_(null).clean(), '', 'claning null returns empty string');
    equals(_(undefined).clean(), '', 'claning undefined returns empty string');
  });

  test('Strings: sprintf', function() {
    // Should be very tested function already.  Thanks to
    // http://www.diveintojavascript.com/projects/sprintf-for-javascript
    equals(_.sprintf('Hello %s', 'me'), 'Hello me', 'basic');
    equals(_('Hello %s').sprintf('me'), 'Hello me', 'object');
    equals(_('hello %s').chain().sprintf('me').capitalize().value(), 'Hello me', 'Chaining works');
    equals(_.sprintf('%.1f', 1.22222), '1.2', 'round');
    equals(_.sprintf('%.1f', 1.17), '1.2', 'round 2');
    equals(_.sprintf('%(id)d - %(name)s', {id: 824, name: 'Hello World'}), '824 - Hello World', 'Named replacements work');
    equals(_.sprintf('%(args[0].id)d - %(args[1].name)s', {args: [{id: 824}, {name: 'Hello World'}]}), '824 - Hello World', 'Named replacements with arrays work');
  });


  test('Strings: vsprintf', function() {
    equals(_.vsprintf('Hello %s', ['me']), 'Hello me', 'basic');
    equals(_('Hello %s').vsprintf(['me']), 'Hello me', 'object');
    equals(_('hello %s').chain().vsprintf(['me']).capitalize().value(), 'Hello me', 'Chaining works');
    equals(_.vsprintf('%.1f', [1.22222]), '1.2', 'round');
    equals(_.vsprintf('%.1f', [1.17]), '1.2', 'round 2');
    equals(_.vsprintf('%(id)d - %(name)s', [{id: 824, name: 'Hello World'}]), '824 - Hello World', 'Named replacement works');
    equals(_.vsprintf('%(args[0].id)d - %(args[1].name)s', [{args: [{id: 824}, {name: 'Hello World'}]}]), '824 - Hello World', 'Named replacement with arrays works');
  });

  test('Strings: startsWith', function() {
    ok(_('foobar').startsWith('foo'), 'foobar starts with foo');
    ok(!_('oobar').startsWith('foo'), 'oobar does not start with foo');
    ok(_(12345).startsWith(123), '12345 starts with 123');
    ok(!_(2345).startsWith(123), '2345 does not start with 123');
    ok(_('').startsWith(''), 'empty string starts with empty string');
    ok(_(null).startsWith(''), 'null starts with empty string');
    ok(!_(null).startsWith('foo'), 'null starts with foo');
  });

  test('Strings: endsWith', function() {
    ok(_('foobar').endsWith('bar'), 'foobar ends with bar');
    ok(_.endsWith('foobar', 'bar'), 'foobar ends with bar');
    ok(_.endsWith('00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4', 'mp4'), 'endsWith .mp4');
    ok(!_('fooba').endsWith('bar'), 'fooba does not end with bar');
    ok(_.endsWith(12345, 45), '12345 ends with 45');
    ok(!_.endsWith(12345, 6), '12345 does not end with 6');
    ok(_('').endsWith(''), 'empty string ends with empty string');
    ok(_(null).endsWith(''), 'null ends with empty string');
    ok(!_(null).endsWith('foo'), 'null ends with foo');
  });

  test('Strings: include', function() {
    ok(_.str.include('foobar', 'bar'), 'foobar includes bar');
    ok(!_.str.include('foobar', 'buzz'), 'foobar does not includes buzz');
    ok(_.str.include(12345, 34), '12345 includes 34');
    ok(!_.str.contains(12345, 6), '12345 does not includes 6');
    ok(!_.str.include('', 34), 'empty string includes 34');
    ok(!_.str.include(null, 34), 'null includes 34');
    ok(_.str.include(null, ''), 'null includes empty string');
  });

  test('String: chop', function(){
    ok(_('whitespace').chop(2).length === 5, 'output [wh, it, es, pa, ce]');
    ok(_('whitespace').chop(3).length === 4, 'output [whi, tes, pac, e]');
    ok(_('whitespace').chop()[0].length === 10, 'output [whitespace]');
    ok(_(12345).chop(1).length === 5, 'output [1, 2, 3,  4, 5]');
  });

  test('String: clean', function(){
    equals(_.clean(' foo     bar   '), 'foo bar');
    equals(_.clean(''), '');
    equals(_.clean(null), '');
    equals(_.clean(1), '1');
  });

  test('String: count', function(){
    equals(_('Hello world').count('l'), 3);
    equals(_('Hello world').count('Hello'), 1);
    equals(_('Hello world').count('foo'), 0);
    equals(_('x.xx....x.x').count('x'), 5);
    equals(_('').count('x'), 0);
    equals(_(null).count('x'), 0);
    equals(_(undefined).count('x'), 0);
    equals(_(12345).count(1), 1);
    equals(_(11345).count(1), 2);
  });

  test('String: insert', function(){
    equals(_('Hello ').insert(6, 'Jessy'), 'Hello Jessy');
    equals(_('Hello ').insert(100, 'Jessy'), 'Hello Jessy');
    equals(_('').insert(100, 'Jessy'), 'Jessy');
    equals(_(null).insert(100, 'Jessy'), 'Jessy');
    equals(_(undefined).insert(100, 'Jessy'), 'Jessy');
    equals(_(12345).insert(6, 'Jessy'), '12345Jessy');
  });

  test('String: splice', function(){
    equals(_('https://edtsech@bitbucket.org/edtsech/underscore.strings').splice(30, 7, 'epeli'),
           'https://edtsech@bitbucket.org/epeli/underscore.strings');
    equals(_.splice(12345, 1, 2, 321), '132145', 'Non strings');
  });

  test('String: succ', function(){
    equals(_('a').succ(), 'b');
    equals(_('A').succ(), 'B');
    equals(_('+').succ(), ',');
    equals(_(1).succ(), '2');
  });

  test('String: titleize', function(){
    equals(_('the titleize string method').titleize(), 'The Titleize String Method');
    equals(_('the titleize string  method').titleize(), 'The Titleize String  Method');
    equals(_('').titleize(), '', 'Titleize empty string returns empty string');
    equals(_(null).titleize(), '', 'Titleize null returns empty string');
    equals(_(undefined).titleize(), '', 'Titleize undefined returns empty string');
    equals(_('let\'s have some fun').titleize(), 'Let\'s Have Some Fun');
    equals(_(123).titleize(), '123');
  });

  test('String: camelize', function(){
    equals(_('the_camelize_string_method').camelize(), 'theCamelizeStringMethod');
    equals(_('-the-camelize-string-method').camelize(), 'TheCamelizeStringMethod');
    equals(_('the camelize string method').camelize(), 'theCamelizeStringMethod');
    equals(_(' the camelize  string method').camelize(), 'theCamelizeStringMethod');
    equals(_('the camelize   string method').camelize(), 'theCamelizeStringMethod');
    equals(_('').camelize(), '', 'Camelize empty string returns empty string');
    equals(_(null).camelize(), '', 'Camelize null returns empty string');
    equals(_(undefined).camelize(), '', 'Camelize undefined returns empty string');
    equals(_(123).camelize(), '123');
  });

  test('String: underscored', function(){
    equals(_('the-underscored-string-method').underscored(), 'the_underscored_string_method');
    equals(_('theUnderscoredStringMethod').underscored(), 'the_underscored_string_method');
    equals(_('TheUnderscoredStringMethod').underscored(), 'the_underscored_string_method');
    equals(_(' the underscored  string method').underscored(), 'the_underscored_string_method');
    equals(_('').underscored(), '');
    equals(_(null).underscored(), '');
    equals(_(undefined).underscored(), '');
    equals(_(123).underscored(), '123');
  });

  test('String: dasherize', function(){
    equals(_('the_dasherize_string_method').dasherize(), 'the-dasherize-string-method');
    equals(_('TheDasherizeStringMethod').dasherize(), '-the-dasherize-string-method');
    equals(_('thisIsATest').dasherize(), 'this-is-a-test');
    equals(_('this Is A Test').dasherize(), 'this-is-a-test');
    equals(_('thisIsATest123').dasherize(), 'this-is-a-test123');
    equals(_('123thisIsATest').dasherize(), '123this-is-a-test');
    equals(_('the dasherize string method').dasherize(), 'the-dasherize-string-method');
    equals(_('the  dasherize string method  ').dasherize(), 'the-dasherize-string-method');
    equals(_('téléphone').dasherize(), 'téléphone');
    equals(_('foo$bar').dasherize(), 'foo$bar');
    equals(_('').dasherize(), '');
    equals(_(null).dasherize(), '');
    equals(_(undefined).dasherize(), '');
    equals(_(123).dasherize(), '123');
  });

  test('String: camelize', function(){
    equals(_.camelize('-moz-transform'), 'MozTransform');
    equals(_.camelize('webkit-transform'), 'webkitTransform');
    equals(_.camelize('under_scored'), 'underScored');
    equals(_.camelize(' with   spaces'), 'withSpaces');
    equals(_('').camelize(), '');
    equals(_(null).camelize(), '');
    equals(_(undefined).camelize(), '');
  });

  test('String: join', function(){
    equals(_.join(1, 2, 3, 4), '21314');
    equals(_.join('|', 'foo', 'bar', 'baz'), 'foo|bar|baz');
    equals(_.join('',2,3,null), '23');
    equals(_.join(null,2,3), '23');
  });

  test('String: classify', function(){
    equals(_.classify(1), '1');
    equals(_('some_class_name').classify(), 'SomeClassName');
  });

  test('String: humanize', function(){
    equals(_('the_humanize_string_method').humanize(), 'The humanize string method');
    equals(_('ThehumanizeStringMethod').humanize(), 'Thehumanize string method');
    equals(_('the humanize string method').humanize(), 'The humanize string method');
    equals(_('the humanize_id string method_id').humanize(), 'The humanize id string method');
    equals(_('the  humanize string method  ').humanize(), 'The humanize string method');
    equals(_('   capitalize dash-CamelCase_underscore trim  ').humanize(), 'Capitalize dash camel case underscore trim');
    equals(_(123).humanize(), '123');
    equals(_('').humanize(), '');
    equals(_(null).humanize(), '');
    equals(_(undefined).humanize(), '');
  });

  test('String: truncate', function(){
    equals(_('Hello world').truncate(6, 'read more'), 'Hello read more');
    equals(_('Hello world').truncate(5), 'Hello...');
    equals(_('Hello').truncate(10), 'Hello');
    equals(_('').truncate(10), '');
    equals(_(null).truncate(10), '');
    equals(_(undefined).truncate(10), '');
    equals(_(1234567890).truncate(5), '12345...');
  });

  test('String: prune', function(){
    equals(_('Hello, cruel world').prune(6, ' read more'), 'Hello read more');
    equals(_('Hello, world').prune(5, 'read a lot more'), 'Hello, world');
    equals(_('Hello, world').prune(5), 'Hello...');
    equals(_('Hello, world').prune(8), 'Hello...');
    equals(_('Hello, cruel world').prune(15), 'Hello, cruel...');
    equals(_('Hello world').prune(22), 'Hello world');
    equals(_('Привет, жестокий мир').prune(6, ' read more'), 'Привет read more');
    equals(_('Привет, мир').prune(6, 'read a lot more'), 'Привет, мир');
    equals(_('Привет, мир').prune(6), 'Привет...');
    equals(_('Привет, мир').prune(8), 'Привет...');
    equals(_('Привет, жестокий мир').prune(16), 'Привет, жестокий...');
    equals(_('Привет, мир').prune(22), 'Привет, мир');
    equals(_('alksjd!!!!!!....').prune(100, ''), 'alksjd!!!!!!....');
    equals(_(123).prune(10), '123');
    equals(_(123).prune(1, 321), '321');
    equals(_('').prune(5), '');
    equals(_(null).prune(5), '');
    equals(_(undefined).prune(5), '');
  });

  test('String: isBlank', function(){
    ok(_('').isBlank());
    ok(_(' ').isBlank());
    ok(_('\n').isBlank());
    ok(!_('a').isBlank());
    ok(!_('0').isBlank());
    ok(!_(0).isBlank());
    ok(_('').isBlank());
    ok(_(null).isBlank());
    ok(_(undefined).isBlank());
  });

  test('String: escapeRegExp', function(){
    equals(_.escapeRegExp(/hello(?=\sworld)/.source), 'hello\\(\\?\\=\\\\sworld\\)', 'with lookahead');
    equals(_.escapeRegExp(/hello(?!\shell)/.source), 'hello\\(\\?\\!\\\\shell\\)', 'with negative lookahead');
  });

  test('String: escapeHTML', function(){
    equals(_('<div>Blah & "blah" & \'blah\'</div>').escapeHTML(),
             '&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;');
    equals(_('&lt;').escapeHTML(), '&amp;lt;');
    equals(_(5).escapeHTML(), '5');
    equals(_('').escapeHTML(), '');
    equals(_(null).escapeHTML(), '');
    equals(_(undefined).escapeHTML(), '');
  });

  test('String: unescapeHTML', function(){
    equals(_('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;').unescapeHTML(),
             '<div>Blah & "blah" & \'blah\'</div>');
    equals(_('&amp;lt;').unescapeHTML(), '&lt;');
    equals(_('&#39;').unescapeHTML(), '\'');
    equals(_('&#0039;').unescapeHTML(), '\'');
    equals(_('&#x4a;').unescapeHTML(), 'J');
    equals(_('&#x04A;').unescapeHTML(), 'J');
    equals(_('&#X4A;').unescapeHTML(), '&#X4A;');
    equals(_('&_#39;').unescapeHTML(), '&_#39;');
    equals(_('&#39_;').unescapeHTML(), '&#39_;');
    equals(_('&amp;#38;').unescapeHTML(), '&#38;');
    equals(_('&#38;amp;').unescapeHTML(), '&amp;');
    equals(_('').unescapeHTML(), '');
    equals(_(null).unescapeHTML(), '');
    equals(_(undefined).unescapeHTML(), '');
    equals(_(5).unescapeHTML(), '5');
    // equals(_(undefined).unescapeHTML(), '');
  });

  test('String: words', function() {
    deepEqual(_('I love you!').words(), ['I', 'love', 'you!']);
    deepEqual(_(' I    love   you!  ').words(), ['I', 'love', 'you!']);
    deepEqual(_('I_love_you!').words('_'), ['I', 'love', 'you!']);
    deepEqual(_('I-love-you!').words(/-/), ['I', 'love', 'you!']);
    deepEqual(_(123).words(), ['123'], '123 number has one word "123".');
    deepEqual(_(0).words(), ['0'], 'Zero number has one word "0".');
    deepEqual(_('').words(), [], 'Empty strings has no words.');
    deepEqual(_('   ').words(), [], 'Blank strings has no words.');
    deepEqual(_(null).words(), [], 'null has no words.');
    deepEqual(_(undefined).words(), [], 'undefined has no words.');
  });

  test('String: chars', function() {
    equals(_('Hello').chars().length, 5);
    equals(_(123).chars().length, 3);
    equals(_('').chars().length, 0);
    equals(_(null).chars().length, 0);
    equals(_(undefined).chars().length, 0);
  });

  test('String: swapCase', function(){
	  equals(_('AaBbCcDdEe').swapCase(), 'aAbBcCdDeE');
    equals(_('Hello World').swapCase(), 'hELLO wORLD');
    equals(_('').swapCase(), '');
    equals(_(null).swapCase(), '');
    equals(_(undefined).swapCase(), '');
  });

  test('String: lines', function() {
    equals(_('Hello\nWorld').lines().length, 2);
    equals(_('Hello World').lines().length, 1);
    equals(_(123).lines().length, 1);
    equals(_('').lines().length, 1);
    equals(_(null).lines().length, 0);
    equals(_(undefined).lines().length, 0);
  });

  test('String: pad', function() {
    equals(_('1').pad(8), '       1');
    equals(_(1).pad(8), '       1');
    equals(_('1').pad(8, '0'), '00000001');
    equals(_('1').pad(8, '0', 'left'), '00000001');
    equals(_('1').pad(8, '0', 'right'), '10000000');
    equals(_('1').pad(8, '0', 'both'), '00001000');
    equals(_('foo').pad(8, '0', 'both'), '000foo00');
    equals(_('foo').pad(7, '0', 'both'), '00foo00');
    equals(_('foo').pad(7, '!@$%dofjrofj', 'both'), '!!foo!!');
    equals(_('').pad(2), '  ');
    equals(_(null).pad(2), '  ');
    equals(_(undefined).pad(2), '  ');
  });

  test('String: lpad', function() {
    equals(_('1').lpad(8), '       1');
    equals(_(1).lpad(8), '       1');
    equals(_('1').lpad(8, '0'), '00000001');
    equals(_('1').lpad(8, '0', 'left'), '00000001');
    equals(_('').lpad(2), '  ');
    equals(_(null).lpad(2), '  ');
    equals(_(undefined).lpad(2), '  ');
  });

  test('String: rpad', function() {
    equals(_('1').rpad(8), '1       ');
    equals(_(1).lpad(8), '       1');
    equals(_('1').rpad(8, '0'), '10000000');
    equals(_('foo').rpad(8, '0'), 'foo00000');
    equals(_('foo').rpad(7, '0'), 'foo0000');
    equals(_('').rpad(2), '  ');
    equals(_(null).rpad(2), '  ');
    equals(_(undefined).rpad(2), '  ');
  });

  test('String: lrpad', function() {
    equals(_('1').lrpad(8), '    1   ');
    equals(_(1).lrpad(8), '    1   ');
    equals(_('1').lrpad(8, '0'), '00001000');
    equals(_('foo').lrpad(8, '0'), '000foo00');
    equals(_('foo').lrpad(7, '0'), '00foo00');
    equals(_('foo').lrpad(7, '!@$%dofjrofj'), '!!foo!!');
    equals(_('').lrpad(2), '  ');
    equals(_(null).lrpad(2), '  ');
    equals(_(undefined).lrpad(2), '  ');
  });

  test('String: toNumber', function() {
    deepEqual(_('not a number').toNumber(), Number.NaN);
    equals(_(0).toNumber(), 0);
    equals(_('0').toNumber(), 0);
    equals(_('0000').toNumber(), 0);
    equals(_('2.345').toNumber(), 2);
    equals(_('2.345').toNumber(NaN), 2);
    equals(_('2.345').toNumber(2), 2.35);
    equals(_('2.344').toNumber(2), 2.34);
    equals(_('2').toNumber(2), 2.00);
    equals(_(2).toNumber(2), 2.00);
    equals(_(-2).toNumber(), -2);
    equals(_('-2').toNumber(), -2);
    equals(_('').toNumber(), 0);
    equals(_(null).toNumber(), 0);
    equals(_(undefined).toNumber(), 0);
  });

  test('String: numberFormat', function() {
    equals(_.numberFormat(9000), '9,000');
    equals(_.numberFormat(9000, 0), '9,000');
    equals(_.numberFormat(90000, 2), '90,000.00');
    equals(_.numberFormat(1000.754), '1,001');
    equals(_.numberFormat(1000.754, 2), '1,000.75');
    equals(_.numberFormat(1000.754, 0, ',', '.'), '1.001');
    equals(_.numberFormat(1000.754, 2, ',', '.'), '1.000,75');
    equals(_.numberFormat(1000000.754, 2, ',', '.'), '1.000.000,75');
    equals(_.numberFormat(1000000000), '1,000,000,000');
    equals(_.numberFormat(100000000), '100,000,000');
    equals(_.numberFormat('not number'), '');
    equals(_.numberFormat(), '');
    equals(_.numberFormat(null, '.', ','), '');
    equals(_.numberFormat(undefined, '.', ','), '');
    equals(_.numberFormat(new Number(5000)), '5,000');
  });

  test('String: strRight', function() {
    equals(_('This_is_a_test_string').strRight('_'), 'is_a_test_string');
    equals(_('This_is_a_test_string').strRight('string'), '');
    equals(_('This_is_a_test_string').strRight(), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strRight(''), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strRight('-'), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strRight(''), 'This_is_a_test_string');
    equals(_('').strRight('foo'), '');
    equals(_(null).strRight('foo'), '');
    equals(_(undefined).strRight('foo'), '');
    equals(_(12345).strRight(2), '345');
  });

  test('String: strRightBack', function() {
    equals(_('This_is_a_test_string').strRightBack('_'), 'string');
    equals(_('This_is_a_test_string').strRightBack('string'), '');
    equals(_('This_is_a_test_string').strRightBack(), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strRightBack(''), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strRightBack('-'), 'This_is_a_test_string');
    equals(_('').strRightBack('foo'), '');
    equals(_(null).strRightBack('foo'), '');
    equals(_(undefined).strRightBack('foo'), '');
    equals(_(12345).strRightBack(2), '345');
  });

  test('String: strLeft', function() {
    equals(_('This_is_a_test_string').strLeft('_'), 'This');
    equals(_('This_is_a_test_string').strLeft('This'), '');
    equals(_('This_is_a_test_string').strLeft(), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strLeft(''), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strLeft('-'), 'This_is_a_test_string');
    equals(_('').strLeft('foo'), '');
    equals(_(null).strLeft('foo'), '');
    equals(_(undefined).strLeft('foo'), '');
    equals(_(123454321).strLeft(3), '12');
  });

  test('String: strLeftBack', function() {
    equals(_('This_is_a_test_string').strLeftBack('_'), 'This_is_a_test');
    equals(_('This_is_a_test_string').strLeftBack('This'), '');
    equals(_('This_is_a_test_string').strLeftBack(), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strLeftBack(''), 'This_is_a_test_string');
    equals(_('This_is_a_test_string').strLeftBack('-'), 'This_is_a_test_string');
    equals(_('').strLeftBack('foo'), '');
    equals(_(null).strLeftBack('foo'), '');
    equals(_(undefined).strLeftBack('foo'), '');
    equals(_(123454321).strLeftBack(3), '123454');
  });

  test('Strings: stripTags', function() {
    equals(_('a <a href="#">link</a>').stripTags(), 'a link');
    equals(_('a <a href="#">link</a><script>alert("hello world!")</scr'+'ipt>').stripTags(), 'a linkalert("hello world!")');
    equals(_('<html><body>hello world</body></html>').stripTags(), 'hello world');
    equals(_(123).stripTags(), '123');
    equals(_('').stripTags(), '');
    equals(_(null).stripTags(), '');
    equals(_(undefined).stripTags(), '');
  });

  test('Strings: toSentence', function() {
    equals(_.toSentence(['jQuery']), 'jQuery', 'array with a single element');
    equals(_.toSentence(['jQuery', 'MooTools']), 'jQuery and MooTools', 'array with two elements');
    equals(_.toSentence(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools and Prototype', 'array with three elements');
    equals(_.toSentence(['jQuery', 'MooTools', 'Prototype', 'YUI']), 'jQuery, MooTools, Prototype and YUI', 'array with multiple elements');
    equals(_.toSentence(['jQuery', 'MooTools', 'Prototype'], ',', ' or '), 'jQuery,MooTools or Prototype', 'handles custom separators');
  });

  test('Strings: toSentenceSerial', function (){
    equals(_.toSentenceSerial(['jQuery']), 'jQuery');
    equals(_.toSentenceSerial(['jQuery', 'MooTools']), 'jQuery and MooTools');
    equals(_.toSentenceSerial(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools, and Prototype');
  });

  test('Strings: slugify', function() {
    equals(_('Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/').slugify(), 'jack-jill-like-numbers-123-and-4-and-silly-characters');
    equals(_('Un éléphant à l\'orée du bois').slugify(), 'un-elephant-a-loree-du-bois');
    equals(_('I know latin characters: á í ó ú ç ã õ ñ ü').slugify(), 'i-know-latin-characters-a-i-o-u-c-a-o-n-u');
    equals(_('I am a word too, even though I am but a single letter: i!').slugify(), 'i-am-a-word-too-even-though-i-am-but-a-single-letter-i');
    equals(_('').slugify(), '');
    equals(_(null).slugify(), '');
    equals(_(undefined).slugify(), '');
  });

  test('Strings: quote', function(){
    equals(_.quote('foo'), '"foo"');
    equals(_.quote('"foo"'), '""foo""');
    equals(_.quote(1), '"1"');
    // alias
    equals(_.q('foo'), '"foo"');
    equals(_.q(''), '""');
    equals(_.q(null), '""');
    equals(_.q(undefined), '""');
  });

  test('Strings: surround', function(){
    equals(_.surround('foo', 'ab'), 'abfooab');
    equals(_.surround(1, 'ab'), 'ab1ab');
    equals(_.surround(1, 2), '212');
    equals(_.surround('foo', 1), '1foo1');
    equals(_.surround('', 1), '11');
    equals(_.surround(null, 1), '11');
    equals(_.surround('foo', ''), 'foo');
    equals(_.surround('foo', null), 'foo');
  });


  test('Strings: repeat', function() {
    equals(_.repeat('foo'), '');
    equals(_.repeat('foo', 3), 'foofoofoo');
    equals(_.repeat('foo', '3'), 'foofoofoo');
    equals(_.repeat(123, 2), '123123');
    equals(_.repeat(1234, 2, '*'), '1234*1234');
    equals(_.repeat(1234, 2, 5), '123451234');
    equals(_.repeat('', 2), '');
    equals(_.repeat(null, 2), '');
    equals(_.repeat(undefined, 2), '');
  });

});
