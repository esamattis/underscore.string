$(document).ready(function() {

  // Include Underscore.string methods to Underscore namespace
  _.mixin(s.exports());

  module('String extensions');

  test('Strings: naturalSort', function() {
    var arr =  ['foo2', 'foo1', 'foo10', 'foo30', 'foo100', 'foo10bar'],
      sorted = ['foo1', 'foo2', 'foo10', 'foo10bar', 'foo30', 'foo100'];
    deepEqual(arr.sort(_.naturalCmp), sorted);
  });

  test("Strings: naturalCmp", function() {
    // Should be associative
    _.each([
      ['abc', '123'],
      ['def', 'abc'],
      ['ab', 'a'],
      ['r69', 'r9'],
      ['123', '122'],
      ['ac2', 'ab3'],
      ['a-12', 'a-11'],
      ['11', '-12'],
      ['15.05', '15'],
      ['15ac', '15ab32'],
      ['16', '15ab'],
      ['15a123', '15a122'],
      ['15ab16', '15ab'],
      ['abc', 'Abc'],
      ['abc', 'aBc'],
      ['aBc', 'Abc']
    ], function(vals) {
      var a = vals[0], b = vals[1];
      equal(_.naturalCmp(a, b), 1, '\'' + a + '\' >= \'' + b + '\'');
      equal(_.naturalCmp(b, a), -1, '\'' + b + '\' <= \'' + a + '\'');
    });
    _.each([
      ['123', '123'],
      ['abc', 'abc'],
      ['r12', 'r12'],
      ['12a', '12a']
    ], function(vals) {
      var a = vals[0], b = vals[1];
      equal(_.naturalCmp(a, b), 0, '\'' + a + '\' == \'' + b + '\'');
      equal(_.naturalCmp(b, a), 0, '\'' + b + '\' == \'' + a + '\'');
    });
  });

  test('Strings: trim', function() {
    equal(_.trim(123), '123', 'Non string');
    equal(_(' foo').trim(), 'foo');
    equal(_('foo ').trim(), 'foo');
    equal(_(' foo ').trim(), 'foo');
    equal(_('    foo     ').trim(), 'foo');
    equal(_('    foo     ').trim(' '), 'foo', 'Manually set whitespace');
    equal(_('\t    foo \t  ').trim(/\s/), 'foo', 'Manually set RegExp /\\s+/');

    equal(_('ffoo').trim('f'), 'oo');
    equal(_('ooff').trim('f'), 'oo');
    equal(_('ffooff').trim('f'), 'oo');


    equal(_('_-foobar-_').trim('_-'), 'foobar');

    equal(_('http://foo/').trim('/'), 'http://foo');
    equal(_('c:\\').trim('\\'), 'c:');

    equal(_(123).trim(), '123');
    equal(_(123).trim(3), '12');
    equal(_('').trim(), '', 'Trim empty string should return empty string');
    equal(_(null).trim(), '', 'Trim null should return empty string');
    equal(_(undefined).trim(), '', 'Trim undefined should return empty string');
  });

  test('String: levenshtein', function() {
    equal(_.levenshtein('Godfather', 'Godfather'), 0);
    equal(_.levenshtein('Godfather', 'Godfathe'), 1);
    equal(_.levenshtein('Godfather', 'odfather'), 1);
    equal(_.levenshtein('Godfather', 'Gdfthr'), 3);
    equal(_.levenshtein('seven', 'eight'), 5);
    equal(_.levenshtein('123', 123), 0);
    equal(_.levenshtein(321, '321'), 0);
    equal(_.levenshtein('lol', null), 3);
    equal(_.levenshtein('lol'), 3);
    equal(_.levenshtein(null, 'lol'), 3);
    equal(_.levenshtein(undefined, 'lol'), 3);
    equal(_.levenshtein(), 0);
  });

  test('Strings: ltrim', function() {
    equal(_(' foo').ltrim(), 'foo');
    equal(_('    foo').ltrim(), 'foo');
    equal(_('foo ').ltrim(), 'foo ');
    equal(_(' foo ').ltrim(), 'foo ');
    equal(_('').ltrim(), '', 'ltrim empty string should return empty string');
    equal(_(null).ltrim(), '', 'ltrim null should return empty string');
    equal(_(undefined).ltrim(), '', 'ltrim undefined should return empty string');

    equal(_('ffoo').ltrim('f'), 'oo');
    equal(_('ooff').ltrim('f'), 'ooff');
    equal(_('ffooff').ltrim('f'), 'ooff');

    equal(_('_-foobar-_').ltrim('_-'), 'foobar-_');

    equal(_(123).ltrim(1), '23');
  });

  test('Strings: rtrim', function() {
    equal(_('http://foo/').rtrim('/'), 'http://foo', 'clean trailing slash');
    equal(_(' foo').rtrim(), ' foo');
    equal(_('foo ').rtrim(), 'foo');
    equal(_('foo     ').rtrim(), 'foo');
    equal(_('foo  bar     ').rtrim(), 'foo  bar');
    equal(_(' foo ').rtrim(), ' foo');

    equal(_('ffoo').rtrim('f'), 'ffoo');
    equal(_('ooff').rtrim('f'), 'oo');
    equal(_('ffooff').rtrim('f'), 'ffoo');

    equal(_('_-foobar-_').rtrim('_-'), '_-foobar');

    equal(_(123).rtrim(3), '12');
    equal(_('').rtrim(), '', 'rtrim empty string should return empty string');
    equal(_(null).rtrim(), '', 'rtrim null should return empty string');
  });

  test('Strings: capitalize', function() {
    equal(_('fabio').capitalize(), 'Fabio', 'First letter is upper case');
    equal(_.capitalize('fabio'), 'Fabio', 'First letter is upper case');
    equal(_.capitalize('FOO'), 'FOO', 'Other letters unchanged');
    equal(_(123).capitalize(), '123', 'Non string');
    equal(_.capitalize(''), '', 'Capitalizing empty string returns empty string');
    equal(_.capitalize(null), '', 'Capitalizing null returns empty string');
    equal(_.capitalize(undefined), '', 'Capitalizing undefined returns empty string');
  });

  test('Strings: decapitalize', function() {
    equal(_('Fabio').decapitalize(), 'fabio', 'First letter is lower case');
    equal(_.decapitalize('Fabio'), 'fabio', 'First letter is lower case');
    equal(_.decapitalize('FOO'), 'fOO', 'Other letters unchanged');
    equal(_(123).decapitalize(), '123', 'Non string');
    equal(_.decapitalize(''), '', 'Decapitalizing empty string returns empty string');
    equal(_.decapitalize(null), '', 'Decapitalizing null returns empty string');
    equal(_.decapitalize(undefined), '', 'Decapitalizing undefined returns empty string');
  });

  test('Strings: join', function() {
    equal(s.join('', 'foo', 'bar'), 'foobar', 'basic join');
    equal(s.join('', 1, 'foo', 2), '1foo2', 'join numbers and strings');
    equal(s.join(' ','foo', 'bar'), 'foo bar', 'join with spaces');
    equal(s.join('1', '2', '2'), '212', 'join number strings');
    equal(s.join(1, 2, 2), '212', 'join numbers');
    equal(s.join('','foo', null), 'foo', 'join null with string returns string');
    equal(s.join(null,'foo', 'bar'), 'foobar', 'join strings with null returns string');
    equal(s.join(1, 2, 3, 4), '21314');
    equal(s.join('|', 'foo', 'bar', 'baz'), 'foo|bar|baz');
    equal(s.join('',2,3,null), '23');
    equal(s.join(null,2,3), '23');
  });

  test('Strings: reverse', function() {
    equal(s.reverse('foo'), 'oof' );
    equal(s.reverse('foobar'), 'raboof' );
    equal(s.reverse('foo bar'), 'rab oof' );
    equal(s.reverse('saippuakauppias'), 'saippuakauppias' );
    equal(s.reverse(123), '321', 'Non string');
    equal(s.reverse(123.45), '54.321', 'Non string');
    equal(s.reverse(''), '', 'reversing empty string returns empty string' );
    equal(s.reverse(null), '', 'reversing null returns empty string' );
    equal(s.reverse(undefined), '', 'reversing undefined returns empty string' );
  });

  test('Strings: clean', function() {
    equal(_(' foo    bar   ').clean(), 'foo bar');
    equal(_(123).clean(), '123');
    equal(_('').clean(), '', 'claning empty string returns empty string');
    equal(_(null).clean(), '', 'claning null returns empty string');
    equal(_(undefined).clean(), '', 'claning undefined returns empty string');
  });

  test('Strings: sprintf', function() {
    // Should be very tested function already.  Thanks to
    // http://www.diveintojavascript.com/projects/sprintf-for-javascript
    equal(_.sprintf('Hello %s', 'me'), 'Hello me', 'basic');
    equal(_('Hello %s').sprintf('me'), 'Hello me', 'object');
    equal(_('hello %s').chain().sprintf('me').capitalize().value(), 'Hello me', 'Chaining works');
    equal(_.sprintf('%.1f', 1.22222), '1.2', 'round');
    equal(_.sprintf('%.1f', 1.17), '1.2', 'round 2');
    equal(_.sprintf('%(id)d - %(name)s', {id: 824, name: 'Hello World'}), '824 - Hello World', 'Named replacements work');
    equal(_.sprintf('%(args[0].id)d - %(args[1].name)s', {args: [{id: 824}, {name: 'Hello World'}]}), '824 - Hello World', 'Named replacements with arrays work');
  });


  test('Strings: vsprintf', function() {
    equal(_.vsprintf('Hello %s', ['me']), 'Hello me', 'basic');
    equal(_('Hello %s').vsprintf(['me']), 'Hello me', 'object');
    equal(_('hello %s').chain().vsprintf(['me']).capitalize().value(), 'Hello me', 'Chaining works');
    equal(_.vsprintf('%.1f', [1.22222]), '1.2', 'round');
    equal(_.vsprintf('%.1f', [1.17]), '1.2', 'round 2');
    equal(_.vsprintf('%(id)d - %(name)s', [{id: 824, name: 'Hello World'}]), '824 - Hello World', 'Named replacement works');
    equal(_.vsprintf('%(args[0].id)d - %(args[1].name)s', [{args: [{id: 824}, {name: 'Hello World'}]}]), '824 - Hello World', 'Named replacement with arrays works');
  });

  test('Strings: startsWith', function() {
    ok(_('foobar').startsWith('foo'), 'foobar starts with foo');
    ok(!_('oobar').startsWith('foo'), 'oobar does not start with foo');
    ok(_('oobar').startsWith('o'), 'oobar starts with o');
    ok(_(12345).startsWith(123), '12345 starts with 123');
    ok(!_(2345).startsWith(123), '2345 does not start with 123');
    ok(_('').startsWith(''), 'empty string starts with empty string');
    ok(_(null).startsWith(''), 'null starts with empty string');
    ok(!_(null).startsWith('foo'), 'null starts with foo');
    ok(_('-foobar').startsWith('foo', 1), 'foobar starts with foo at position 1');
    ok(_('foobar').startsWith('foo', 0), 'foobar starts with foo at position 0');
    ok(!_('foobar').startsWith('foo', 1), 'foobar starts not with foo at position 1');
    ok(_('Äpfel').startsWith('Ä'), 'string starts with a unicode');

    strictEqual(_('hello').startsWith('hell'), true);
    strictEqual(_('HELLO').startsWith('HELL'), true);
    strictEqual(_('HELLO').startsWith('hell'), false);
    strictEqual(_('HELLO').startsWith('hell'), false);
    strictEqual(_('hello').startsWith('hell', 0), true);
    strictEqual(_('HELLO').startsWith('HELL', 0), true);
    strictEqual(_('HELLO').startsWith('hell', 0), false);
    strictEqual(_('HELLO').startsWith('hell', 0), false);
    strictEqual(_('HELLO').startsWith(), false);
    strictEqual(_('undefined').startsWith(), true);
    strictEqual(_('null').startsWith(null), true);
    strictEqual(_('hello').startsWith('hell', -20), true);
    strictEqual(_('hello').startsWith('hell', 1), false);
    strictEqual(_('hello').startsWith('hell', 2), false);
    strictEqual(_('hello').startsWith('hell', 3), false);
    strictEqual(_('hello').startsWith('hell', 4), false);
    strictEqual(_('hello').startsWith('hell', 5), false);
    strictEqual(_('hello').startsWith('hell', 20), false);
  });

  test('Strings: endsWith', function() {
    ok(_('foobar').endsWith('bar'), 'foobar ends with bar');
    ok(_('foobarfoobar').endsWith('bar'), 'foobar ends with bar');
    ok(_('foo').endsWith('o'), 'foobar ends with o');
    ok(_.endsWith('foobar', 'bar'), 'foobar ends with bar');
    ok(_.endsWith('00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4', 'mp4'), 'endsWith .mp4');
    ok(!_('fooba').endsWith('bar'), 'fooba does not end with bar');
    ok(_.endsWith(12345, 45), '12345 ends with 45');
    ok(!_.endsWith(12345, 6), '12345 does not end with 6');
    ok(_('').endsWith(''), 'empty string ends with empty string');
    ok(_(null).endsWith(''), 'null ends with empty string');
    ok(!_(null).endsWith('foo'), 'null ends with foo');
    ok(_('foobar?').endsWith('bar', 6), 'foobar ends with bar at position 6');
    ok(_(12345).endsWith(34, 4), 'number ends with 34 at position 4');
    ok(!_(12345).endsWith(45, 4), 'number ends not with 45 at position 4');
    ok(_('foobä').endsWith('ä'), 'string ends with a unicode');

    strictEqual(_('vader').endsWith('der'), true);
    strictEqual(_('VADER').endsWith('DER'), true);
    strictEqual(_('VADER').endsWith('der'), false);
    strictEqual(_('VADER').endsWith('DeR'), false);
    strictEqual(_('VADER').endsWith(), false);
    strictEqual(_('undefined').endsWith(), true);
    strictEqual(_('null').endsWith(null), true);
    strictEqual(_('vader').endsWith('der', 5), true);
    strictEqual(_('VADER').endsWith('DER', 5), true);
    strictEqual(_('VADER').endsWith('der', 5), false);
    strictEqual(_('VADER').endsWith('DER', 5), true);
    strictEqual(_('VADER').endsWith('der', 5), false);
    strictEqual(_('vader').endsWith('der', -20), false);
    strictEqual(_('vader').endsWith('der', 0), false);
    strictEqual(_('vader').endsWith('der', 1), false);
    strictEqual(_('vader').endsWith('der', 2), false);
    strictEqual(_('vader').endsWith('der', 3), false);
    strictEqual(_('vader').endsWith('der', 4), false);
  });

  test('Strings: include', function() {
    ok(s.include('foobar', 'bar'), 'foobar includes bar');
    ok(!s.include('foobar', 'buzz'), 'foobar does not includes buzz');
    ok(s.include(12345, 34), '12345 includes 34');
    ok(!s.contains(12345, 6), '12345 does not includes 6');
    ok(!s.include('', 34), 'empty string includes 34');
    ok(!s.include(null, 34), 'null includes 34');
    ok(s.include(null, ''), 'null includes empty string');
  });

  test('String: chop', function(){
    ok(_('whitespace').chop(2).length === 5, 'output [wh, it, es, pa, ce]');
    ok(_('whitespace').chop(3).length === 4, 'output [whi, tes, pac, e]');
    ok(_('whitespace').chop()[0].length === 10, 'output [whitespace]');
    ok(_(12345).chop(1).length === 5, 'output [1, 2, 3,  4, 5]');
  });

  test('String: clean', function(){
    equal(_.clean(' foo     bar   '), 'foo bar');
    equal(_.clean(''), '');
    equal(_.clean(null), '');
    equal(_.clean(1), '1');
  });

  test('String: count', function(){
    equal(_('Hello world').count('l'), 3);
    equal(_('Hello world').count('Hello'), 1);
    equal(_('Hello world').count('foo'), 0);
    equal(_('x.xx....x.x').count('x'), 5);
    equal(_('').count('x'), 0);
    equal(_(null).count('x'), 0);
    equal(_(undefined).count('x'), 0);
    equal(_(12345).count(1), 1);
    equal(_(11345).count(1), 2);
    equal(_('Hello World').count(''), 0);
    equal(_('Hello World').count(null), 0);
    equal(_('Hello World').count(undefined), 0);
    equal(_('').count(''), 0);
    equal(_(null).count(null), 0);
    equal(_(undefined).count(undefined), 0);
  });

  test('String: insert', function(){
    equal(_('Hello ').insert(6, 'Jessy'), 'Hello Jessy');
    equal(_('Hello ').insert(100, 'Jessy'), 'Hello Jessy');
    equal(_('').insert(100, 'Jessy'), 'Jessy');
    equal(_(null).insert(100, 'Jessy'), 'Jessy');
    equal(_(undefined).insert(100, 'Jessy'), 'Jessy');
    equal(_(12345).insert(6, 'Jessy'), '12345Jessy');
  });

  test('String: replaceAll', function(){
    equal(_('a').replaceAll('a', 'b'), 'b');
    equal(_('aa').replaceAll('a', 'b'), 'bb');
    equal(_('aca').replaceAll('a', 'b'), 'bcb');
    equal(_('ccc').replaceAll('a', 'b'), 'ccc');
    equal(_('AAa').replaceAll('a', 'b'), 'AAb');
    equal(_('Aa').replaceAll('a', 'b', true), 'bb');
    equal(_('foo bar foo').replaceAll('foo', 'moo'), 'moo bar moo');
    equal(_('foo bar\n foo').replaceAll('foo', 'moo'), 'moo bar\n moo');
    equal(_('foo bar FoO').replaceAll('foo', 'moo', true), 'moo bar moo');
    equal(_('').replaceAll('a', 'b'), '');
    equal(_(null).replaceAll('a', 'b'), '');
    equal(_(undefined).replaceAll('a', 'b'), '');
    equal(_(12345).replaceAll('a', 'b'), 12345);
  });

  test('String: splice', function(){
    equal(_('https://edtsech@bitbucket.org/edtsech/underscore.strings').splice(30, 7, 'epeli'),
           'https://edtsech@bitbucket.org/epeli/underscore.strings');
    equal(_.splice(12345, 1, 2, 321), '132145', 'Non strings');
  });

  test('String: pred', function(){
    equal(_('b').pred(), 'a');
    equal(_('B').pred(), 'A');
    equal(_(',').pred(), '+');
    equal(_(2).pred(), '1');
    deepEqual(_().pred().length, 0);
    deepEqual(_('').pred().length, 0);
    deepEqual(_(null).pred().length, 0);
    deepEqual(_(undefined).pred().length, 0);
    deepEqual(_().pred(), '');
    deepEqual(_('').pred(), '');
    deepEqual(_(null).pred(), '');
    deepEqual(_(undefined).pred(), '');
  });

  test('String: succ', function(){
    equal(_('a').succ(), 'b');
    equal(_('A').succ(), 'B');
    equal(_('+').succ(), ',');
    equal(_(1).succ(), '2');
    deepEqual(_().succ().length, 0);
    deepEqual(_('').succ().length, 0);
    deepEqual(_(null).succ().length, 0);
    deepEqual(_(undefined).succ().length, 0);
    deepEqual(_().succ(), '');
    deepEqual(_('').succ(), '');
    deepEqual(_(null).succ(), '');
    deepEqual(_(undefined).succ(), '');
  });

  test('String: titleize', function(){
    equal(_('the titleize string method').titleize(), 'The Titleize String Method');
    equal(_('the titleize string  method').titleize(), 'The Titleize String  Method');
    equal(_('').titleize(), '', 'Titleize empty string returns empty string');
    equal(_(null).titleize(), '', 'Titleize null returns empty string');
    equal(_(undefined).titleize(), '', 'Titleize undefined returns empty string');
    equal(_('let\'s have some fun').titleize(), 'Let\'s Have Some Fun');
    equal(_('a-dash-separated-string').titleize(), 'A-Dash-Separated-String');
    equal(_('A-DASH-SEPARATED-STRING').titleize(), 'A-Dash-Separated-String');
    equal(_(123).titleize(), '123');
  });

  test('String: camelize', function(){
    equal(_('the_camelize_string_method').camelize(), 'theCamelizeStringMethod');
    equal(_('webkit-transform').camelize(), 'webkitTransform');
    equal(_('-the-camelize-string-method').camelize(), 'TheCamelizeStringMethod');
    equal(_('_the_camelize_string_method').camelize(), 'TheCamelizeStringMethod');
    equal(_('The-camelize-string-method').camelize(), 'TheCamelizeStringMethod');
    equal(_('the camelize string method').camelize(), 'theCamelizeStringMethod');
    equal(_(' the camelize  string method').camelize(), 'theCamelizeStringMethod');
    equal(_('the camelize   string method').camelize(), 'theCamelizeStringMethod');
    equal(_(' with   spaces').camelize(), 'withSpaces');
    equal(_("_som eWeird---name-").camelize(), 'SomEWeirdName');
    equal(_('').camelize(), '', 'Camelize empty string returns empty string');
    equal(_(null).camelize(), '', 'Camelize null returns empty string');
    equal(_(undefined).camelize(), '', 'Camelize undefined returns empty string');
    equal(_(123).camelize(), '123');
    equal(_('the_camelize_string_method').camelize(true), 'theCamelizeStringMethod');
    equal(_('webkit-transform').camelize(true), 'webkitTransform');
    equal(_('-the-camelize-string-method').camelize(true), 'theCamelizeStringMethod');
    equal(_('_the_camelize_string_method').camelize(true), 'theCamelizeStringMethod');
    equal(_('The-camelize-string-method').camelize(true), 'theCamelizeStringMethod');
    equal(_('the camelize string method').camelize(true), 'theCamelizeStringMethod');
    equal(_(' the camelize  string method').camelize(true), 'theCamelizeStringMethod');
    equal(_('the camelize   string method').camelize(true), 'theCamelizeStringMethod');
    equal(_(' with   spaces').camelize(true), 'withSpaces');
    equal(_("_som eWeird---name-").camelize(true), 'somEWeirdName');
    equal(_('').camelize(true), '', 'Camelize empty string returns empty string');
    equal(_(null).camelize(true), '', 'Camelize null returns empty string');
    equal(_(undefined).camelize(true), '', 'Camelize undefined returns empty string');
    equal(_(123).camelize(true), '123');
  });

  test('String: underscored', function(){
    equal(_('the-underscored-string-method').underscored(), 'the_underscored_string_method');
    equal(_('theUnderscoredStringMethod').underscored(), 'the_underscored_string_method');
    equal(_('TheUnderscoredStringMethod').underscored(), 'the_underscored_string_method');
    equal(_(' the underscored  string method').underscored(), 'the_underscored_string_method');
    equal(_('').underscored(), '');
    equal(_(null).underscored(), '');
    equal(_(undefined).underscored(), '');
    equal(_(123).underscored(), '123');
  });

  test('String: dasherize', function(){
    equal(_('the_dasherize_string_method').dasherize(), 'the-dasherize-string-method');
    equal(_('TheDasherizeStringMethod').dasherize(), '-the-dasherize-string-method');
    equal(_('thisIsATest').dasherize(), 'this-is-a-test');
    equal(_('this Is A Test').dasherize(), 'this-is-a-test');
    equal(_('thisIsATest123').dasherize(), 'this-is-a-test123');
    equal(_('123thisIsATest').dasherize(), '123this-is-a-test');
    equal(_('the dasherize string method').dasherize(), 'the-dasherize-string-method');
    equal(_('the  dasherize string method  ').dasherize(), 'the-dasherize-string-method');
    equal(_('téléphone').dasherize(), 'téléphone');
    equal(_('foo$bar').dasherize(), 'foo$bar');
    equal(_('').dasherize(), '');
    equal(_(null).dasherize(), '');
    equal(_(undefined).dasherize(), '');
    equal(_(123).dasherize(), '123');
  });

  test('String: classify', function(){
    equal(_.classify(1), '1');
    equal(_('some_class_name').classify(), 'SomeClassName');
    equal(_('my wonderfull class_name').classify(), 'MyWonderfullClassName');
    equal(_('my wonderfull.class.name').classify(), 'MyWonderfullClassName');
    equal(_('myLittleCamel').classify(), 'MyLittleCamel');
    equal(_('myLittleCamel.class.name').classify(), 'MyLittleCamelClassName');
    equal(_(123).classify(), '123');
    equal(_('').classify(), '');
    equal(_(null).classify(), '');
    equal(_(undefined).classify(), '');
  });

  test('String: humanize', function(){
    equal(_('the_humanize_string_method').humanize(), 'The humanize string method');
    equal(_('ThehumanizeStringMethod').humanize(), 'Thehumanize string method');
    equal(_('-ThehumanizeStringMethod').humanize(), 'Thehumanize string method');
    equal(_('the humanize string method').humanize(), 'The humanize string method');
    equal(_('the humanize_id string method_id').humanize(), 'The humanize id string method');
    equal(_('the  humanize string method  ').humanize(), 'The humanize string method');
    equal(_('   capitalize dash-CamelCase_underscore trim  ').humanize(), 'Capitalize dash camel case underscore trim');
    equal(_(123).humanize(), '123');
    equal(_('').humanize(), '');
    equal(_(null).humanize(), '');
    equal(_(undefined).humanize(), '');
  });

  test('String: truncate', function(){
    equal(_('Hello world').truncate(6, 'read more'), 'Hello read more');
    equal(_('Hello world').truncate(5), 'Hello...');
    equal(_('Hello').truncate(10), 'Hello');
    equal(_('').truncate(10), '');
    equal(_(null).truncate(10), '');
    equal(_(undefined).truncate(10), '');
    equal(_(1234567890).truncate(5), '12345...');
  });

  test('String: prune', function(){
    equal(_('Hello, cruel world').prune(6, ' read more'), 'Hello read more');
    equal(_('Hello, world').prune(5, 'read a lot more'), 'Hello, world');
    equal(_('Hello, world').prune(5), 'Hello...');
    equal(_('Hello, world').prune(8), 'Hello...');
    equal(_('Hello, cruel world').prune(15), 'Hello, cruel...');
    equal(_('Hello world').prune(22), 'Hello world');
    equal(_('Привет, жестокий мир').prune(6, ' read more'), 'Привет read more');
    equal(_('Привет, мир').prune(6, 'read a lot more'), 'Привет, мир');
    equal(_('Привет, мир').prune(6), 'Привет...');
    equal(_('Привет, мир').prune(8), 'Привет...');
    equal(_('Привет, жестокий мир').prune(16), 'Привет, жестокий...');
    equal(_('Привет, мир').prune(22), 'Привет, мир');
    equal(_('alksjd!!!!!!....').prune(100, ''), 'alksjd!!!!!!....');
    equal(_(123).prune(10), '123');
    equal(_(123).prune(1, 321), '321');
    equal(_('').prune(5), '');
    equal(_(null).prune(5), '');
    equal(_(undefined).prune(5), '');
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
    equal(_.escapeRegExp(/hello(?=\sworld)/.source), 'hello\\(\\?\\=\\\\sworld\\)', 'with lookahead');
    equal(_.escapeRegExp(/hello(?!\shell)/.source), 'hello\\(\\?\\!\\\\shell\\)', 'with negative lookahead');
  });

  test('String: escapeHTML', function(){
    equal(_('<div>Blah & "blah" & \'blah\'</div>').escapeHTML(),
             '&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &#39;blah&#39;&lt;/div&gt;');
    equal(_('&lt;').escapeHTML(), '&amp;lt;');
    equal(_(5).escapeHTML(), '5');
    equal(_('').escapeHTML(), '');
    equal(_(null).escapeHTML(), '');
    equal(_(undefined).escapeHTML(), '');
  });

  test('String: unescapeHTML', function(){
    equal(_('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&#39;&lt;/div&gt;').unescapeHTML(),
             '<div>Blah & "blah" & \'blah\'</div>');
    equal(_('&amp;lt;').unescapeHTML(), '&lt;');
    equal(_('&apos;').unescapeHTML(), '\'');
    equal(_('&#39;').unescapeHTML(), '\'');
    equal(_('&#0039;').unescapeHTML(), '\'');
    equal(_('&#x4a;').unescapeHTML(), 'J');
    equal(_('&#x04A;').unescapeHTML(), 'J');
    equal(_('&#X4A;').unescapeHTML(), '&#X4A;');
    equal(_('&_#39;').unescapeHTML(), '&_#39;');
    equal(_('&#39_;').unescapeHTML(), '&#39_;');
    equal(_('&amp;#38;').unescapeHTML(), '&#38;');
    equal(_('&#38;amp;').unescapeHTML(), '&amp;');
    equal(_('').unescapeHTML(), '');
    equal(_(null).unescapeHTML(), '');
    equal(_(undefined).unescapeHTML(), '');
    equal(_(5).unescapeHTML(), '5');
    // equal(_(undefined).unescapeHTML(), '');
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
    equal(_('Hello').chars().length, 5);
    equal(_(123).chars().length, 3);
    equal(_('').chars().length, 0);
    equal(_(null).chars().length, 0);
    equal(_(undefined).chars().length, 0);
  });

  test('String: swapCase', function(){
	  equal(_('AaBbCcDdEe').swapCase(), 'aAbBcCdDeE');
    equal(_('Hello World').swapCase(), 'hELLO wORLD');
    equal(_('').swapCase(), '');
    equal(_(null).swapCase(), '');
    equal(_(undefined).swapCase(), '');
  });

  test('String: lines', function() {
    equal(_('Hello\nWorld').lines().length, 2);
    equal(_('Hello World').lines().length, 1);
    equal(_(123).lines().length, 1);
    deepEqual(_('').lines(), ['']);
    deepEqual(_(null).lines(), []);
    deepEqual(_(undefined).lines(), []);
    deepEqual(_('Hello\rWorld').lines(), ['Hello\rWorld']);
    deepEqual(_('Hello\r\nWorld').lines(), ['Hello', 'World']);
  });

  test('String: dedent', function() {
    equal(_('Hello\nWorld').dedent(), 'Hello\nWorld');
    equal(_('Hello\t\nWorld').dedent(), 'Hello\t\nWorld');
    equal(_('Hello \nWorld').dedent(), 'Hello \nWorld');
    equal(_('Hello\n  World').dedent(), 'Hello\n  World');
    equal(_('    Hello\n  World').dedent(), '  Hello\nWorld');
    equal(_('  Hello\nWorld').dedent(), '  Hello\nWorld');
    equal(_('  Hello World').dedent(), 'Hello World');
    equal(_('  Hello\n  World').dedent(), 'Hello\nWorld');
    equal(_('  Hello\n    World').dedent(), 'Hello\n  World');
    equal(_('\t\tHello\tWorld').dedent(), 'Hello\tWorld');
    equal(_('\t\tHello\n\t\tWorld').dedent(), 'Hello\nWorld');
    equal(_('Hello\n\t\tWorld').dedent(), 'Hello\n\t\tWorld');
    equal(_('\t\tHello\n\t\t\t\tWorld').dedent(), 'Hello\n\t\tWorld');
    equal(_('\t\tHello\r\n\t\t\t\tWorld').dedent(), 'Hello\r\n\t\tWorld');
    equal(_('\t\tHello\r\n\r\n\t\t\t\tWorld').dedent(), 'Hello\r\n\r\n\t\tWorld');
    equal(_('\t\tHello\n\n\n\n\t\t\t\tWorld').dedent(), 'Hello\n\n\n\n\t\tWorld');
    equal(_('\t\t\tHello\n\t\tWorld').dedent('\\t'), '\t\tHello\n\tWorld');
    equal(_('    Hello\n    World').dedent('  '), '  Hello\n  World');
    equal(_('    Hello\n    World').dedent(''), '    Hello\n    World');
    equal(_('\t\tHello\n\n\n\n\t\t\t\tWorld').dedent('\\t'), '\tHello\n\n\n\n\t\t\tWorld');
    equal(_('Hello\n\t\tWorld').dedent('\t'), 'Hello\n\t\tWorld');
    equal(_('Hello\n  World').dedent(' '), 'Hello\n  World');
    equal(_('  Hello\nWorld').dedent(' '), '  Hello\nWorld');
    deepEqual(_(123).dedent(), '123');
    deepEqual(_('').dedent(), '');
    deepEqual(_(null).dedent(), '');
    deepEqual(_(undefined).dedent(), '');
  });

  test('String: pad', function() {
    equal(_('1').pad(8), '       1');
    equal(_(1).pad(8), '       1');
    equal(_('1').pad(8, '0'), '00000001');
    equal(_('1').pad(8, '0', 'left'), '00000001');
    equal(_('1').pad(8, '0', 'right'), '10000000');
    equal(_('1').pad(8, '0', 'both'), '00001000');
    equal(_('foo').pad(8, '0', 'both'), '000foo00');
    equal(_('foo').pad(7, '0', 'both'), '00foo00');
    equal(_('foo').pad(7, '!@$%dofjrofj', 'both'), '!!foo!!');
    equal(_('').pad(2), '  ');
    equal(_(null).pad(2), '  ');
    equal(_(undefined).pad(2), '  ');
  });

  test('String: lpad', function() {
    equal(_('1').lpad(8), '       1');
    equal(_(1).lpad(8), '       1');
    equal(_('1').lpad(8, '0'), '00000001');
    equal(_('1').lpad(8, '0', 'left'), '00000001');
    equal(_('').lpad(2), '  ');
    equal(_(null).lpad(2), '  ');
    equal(_(undefined).lpad(2), '  ');
  });

  test('String: rpad', function() {
    equal(_('1').rpad(8), '1       ');
    equal(_(1).lpad(8), '       1');
    equal(_('1').rpad(8, '0'), '10000000');
    equal(_('foo').rpad(8, '0'), 'foo00000');
    equal(_('foo').rpad(7, '0'), 'foo0000');
    equal(_('').rpad(2), '  ');
    equal(_(null).rpad(2), '  ');
    equal(_(undefined).rpad(2), '  ');
  });

  test('String: lrpad', function() {
    equal(_('1').lrpad(8), '    1   ');
    equal(_(1).lrpad(8), '    1   ');
    equal(_('1').lrpad(8, '0'), '00001000');
    equal(_('foo').lrpad(8, '0'), '000foo00');
    equal(_('foo').lrpad(7, '0'), '00foo00');
    equal(_('foo').lrpad(7, '!@$%dofjrofj'), '!!foo!!');
    equal(_('').lrpad(2), '  ');
    equal(_(null).lrpad(2), '  ');
    equal(_(undefined).lrpad(2), '  ');
  });

  test('String: toNumber', function() {
    _.each(['not a number', NaN, {}, [/a/], 'alpha6'], function(val) {
      deepEqual(_('not a number').toNumber(), NaN);
      equal(_(Math.PI).toNumber(val), 3);
    });
    equal(_(0).toNumber(), 0);
    equal(_('0').toNumber(), 0);
    equal(_('0.0').toNumber(), 0);
    equal(_('        0.0    ').toNumber(), 0);
    equal(_('0.1').toNumber(), 0);
    equal(_('0.1').toNumber(1), 0.1);
    equal(_('  0.1 ').toNumber(1), 0.1);
    equal(_('0000').toNumber(), 0);
    equal(_('2.345').toNumber(), 2);
    equal(_('2.345').toNumber(NaN), 2);
    equal(_('2.345').toNumber(2), 2.35);
    equal(_('2.344').toNumber(2), 2.34);
    equal(_('2').toNumber(2), 2.00);
    equal(_(2).toNumber(2), 2.00);
    equal(_(-2).toNumber(), -2);
    equal(_('-2').toNumber(), -2);
    equal(_(-2.5123).toNumber(3), -2.512);

    // Negative precisions
    equal(_(-234).toNumber(-1), -230);
    equal(_(234).toNumber(-2), 200);
    equal(_('234').toNumber(-2), 200);

    _.each(['', null, undefined], function(val) {
      equal(_(val).toNumber(), 0);
    });

    _.each([Infinity, -Infinity], function(val) {
      equal(_(val).toNumber(), val);
      equal(_(val).toNumber(val), val);
      equal(_(1).toNumber(val), 1);
    });
  });

  test('String: numberFormat', function() {
    equal(_.numberFormat(9000), '9,000');
    equal(_.numberFormat(9000, 0), '9,000');
    equal(_.numberFormat(9000, 0, '', ''), '9000');
    equal(_.numberFormat(90000, 2), '90,000.00');
    equal(_.numberFormat(1000.754), '1,001');
    equal(_.numberFormat(1000.754, 2), '1,000.75');
    equal(_.numberFormat(1000.755, 2), '1,000.75');
    equal(_.numberFormat(1000.756, 2), '1,000.76');
    equal(_.numberFormat(1000.754, 0, ',', '.'), '1.001');
    equal(_.numberFormat(1000.754, 2, ',', '.'), '1.000,75');
    equal(_.numberFormat(1000000.754, 2, ',', '.'), '1.000.000,75');
    equal(_.numberFormat(1000000000), '1,000,000,000');
    equal(_.numberFormat(100000000), '100,000,000');
    equal(_.numberFormat('not number'), '');
    equal(_.numberFormat(), '');
    equal(_.numberFormat(null, '.', ','), '');
    equal(_.numberFormat(undefined, '.', ','), '');
    equal(_.numberFormat(new Number(5000)), '5,000');
  });

  test('String: strRight', function() {
    equal(_('This_is_a_test_string').strRight('_'), 'is_a_test_string');
    equal(_('This_is_a_test_string').strRight('string'), '');
    equal(_('This_is_a_test_string').strRight(), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strRight(''), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strRight('-'), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strRight(''), 'This_is_a_test_string');
    equal(_('').strRight('foo'), '');
    equal(_(null).strRight('foo'), '');
    equal(_(undefined).strRight('foo'), '');
    equal(_(12345).strRight(2), '345');
  });

  test('String: strRightBack', function() {
    equal(_('This_is_a_test_string').strRightBack('_'), 'string');
    equal(_('This_is_a_test_string').strRightBack('string'), '');
    equal(_('This_is_a_test_string').strRightBack(), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strRightBack(''), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strRightBack('-'), 'This_is_a_test_string');
    equal(_('').strRightBack('foo'), '');
    equal(_(null).strRightBack('foo'), '');
    equal(_(undefined).strRightBack('foo'), '');
    equal(_(12345).strRightBack(2), '345');
  });

  test('String: strLeft', function() {
    equal(_('This_is_a_test_string').strLeft('_'), 'This');
    equal(_('This_is_a_test_string').strLeft('This'), '');
    equal(_('This_is_a_test_string').strLeft(), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strLeft(''), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strLeft('-'), 'This_is_a_test_string');
    equal(_('').strLeft('foo'), '');
    equal(_(null).strLeft('foo'), '');
    equal(_(undefined).strLeft('foo'), '');
    equal(_(123454321).strLeft(3), '12');
  });

  test('String: strLeftBack', function() {
    equal(_('This_is_a_test_string').strLeftBack('_'), 'This_is_a_test');
    equal(_('This_is_a_test_string').strLeftBack('This'), '');
    equal(_('This_is_a_test_string').strLeftBack(), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strLeftBack(''), 'This_is_a_test_string');
    equal(_('This_is_a_test_string').strLeftBack('-'), 'This_is_a_test_string');
    equal(_('').strLeftBack('foo'), '');
    equal(_(null).strLeftBack('foo'), '');
    equal(_(undefined).strLeftBack('foo'), '');
    equal(_(123454321).strLeftBack(3), '123454');
  });

  test('Strings: stripTags', function() {
    equal(_('a <a href="#">link</a>').stripTags(), 'a link');
    equal(_('a <a href="#">link</a><script>alert("hello world!")</scr'+'ipt>').stripTags(), 'a linkalert("hello world!")');
    equal(_('<html><body>hello world</body></html>').stripTags(), 'hello world');
    equal(_(123).stripTags(), '123');
    equal(_('').stripTags(), '');
    equal(_(null).stripTags(), '');
    equal(_(undefined).stripTags(), '');
  });

  test('Strings: toSentence', function() {
    equal(_.toSentence(['jQuery']), 'jQuery', 'array with a single element');
    equal(_.toSentence(['jQuery', 'MooTools']), 'jQuery and MooTools', 'array with two elements');
    equal(_.toSentence(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools and Prototype', 'array with three elements');
    equal(_.toSentence(['jQuery', 'MooTools', 'Prototype', 'YUI']), 'jQuery, MooTools, Prototype and YUI', 'array with multiple elements');
    equal(_.toSentence(['jQuery', 'MooTools', 'Prototype'], ',', ' or '), 'jQuery,MooTools or Prototype', 'handles custom separators');
  });

  test('Strings: toSentenceSerial', function (){
    equal(_.toSentenceSerial(['jQuery']), 'jQuery');
    equal(_.toSentenceSerial(['jQuery', 'MooTools']), 'jQuery and MooTools');
    equal(_.toSentenceSerial(['jQuery', 'MooTools', 'Prototype']), 'jQuery, MooTools, and Prototype');
  });

  test('Strings: slugify', function() {
    equal(_('Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/').slugify(), 'jack-jill-like-numbers-1-2-3-and-4-and-silly-characters');
    equal(_('Un éléphant à l\'orée du bois').slugify(), 'un-elephant-a-l-oree-du-bois');
    equal(_('I know latin characters: á í ó ú ç ã õ ñ ü ă ș ț').slugify(), 'i-know-latin-characters-a-i-o-u-c-a-o-n-u-a-s-t');
    equal(_('I am a word too, even though I am but a single letter: i!').slugify(), 'i-am-a-word-too-even-though-i-am-but-a-single-letter-i');
    equal(_('Some asian 天地人 characters').slugify(), 'some-asian-characters');
    equal(_('').slugify(), '');
    equal(_(null).slugify(), '');
    equal(_(undefined).slugify(), '');
  });

  test('Strings: quote', function(){
    equal(_.quote('foo'), '"foo"');
    equal(_.quote('"foo"'), '""foo""');
    equal(_.quote(1), '"1"');
    equal(_.quote("foo", "'"), "'foo'");

    // alias
    equal(_.q('foo'), '"foo"');
    equal(_.q(''), '""');
    equal(_.q(null), '""');
    equal(_.q(undefined), '""');
  });

  test('Strings: unquote', function(){
    equal(_.unquote('"foo"'), 'foo');
    equal(_.unquote('""foo""'), '"foo"');
    equal(_.unquote('"1"'), '1');
    equal(_.unquote("'foo'", "'"), 'foo');
  });

  test('Strings: surround', function(){
    equal(_.surround('foo', 'ab'), 'abfooab');
    equal(_.surround(1, 'ab'), 'ab1ab');
    equal(_.surround(1, 2), '212');
    equal(_.surround('foo', 1), '1foo1');
    equal(_.surround('', 1), '11');
    equal(_.surround(null, 1), '11');
    equal(_.surround('foo', ''), 'foo');
    equal(_.surround('foo', null), 'foo');
  });


  test('Strings: repeat', function() {
    equal(_.repeat('foo'), '');
    equal(_.repeat('foo', 3), 'foofoofoo');
    equal(_.repeat('foo', '3'), 'foofoofoo');
    equal(_.repeat(123, 2), '123123');
    equal(_.repeat(1234, 2, '*'), '1234*1234');
    equal(_.repeat(1234, 2, 5), '123451234');
    equal(_.repeat('', 2), '');
    equal(_.repeat(null, 2), '');
    equal(_.repeat(undefined, 2), '');
  });

  test('String: toBoolean', function() {
    strictEqual(_("false").toBoolean(), false);
    strictEqual(_.toBoolean("false"), false);
    strictEqual(_.toBoolean("False"), false);
    strictEqual(_.toBoolean("Falsy",null,["false", "falsy"]), false);
    strictEqual(_.toBoolean("true"), true);
    strictEqual(_.toBoolean("the truth", "the truth", "this is falsy"), true);
    strictEqual(_.toBoolean("this is falsy", "the truth", "this is falsy"), false);
    strictEqual(_("true").toBoolean(), true);
    strictEqual(_.toBoolean("trUe"), true);
    strictEqual(_.toBoolean("trUe", /tru?/i), true);
    strictEqual(_.toBoolean("something else"), undefined);
    strictEqual(_.toBoolean(function(){}), true);
    strictEqual(_.toBoolean(/regexp/), true);
    strictEqual(_.toBoolean(""), undefined);
    strictEqual(_.toBoolean(0), false);
    strictEqual(_.toBoolean(1), true);
    strictEqual(_.toBoolean("1"), true);
    strictEqual(_.toBoolean("0"), false);
    strictEqual(_.toBoolean(2), undefined);
    strictEqual(_.toBoolean("foo true bar"), undefined);
    strictEqual(_.toBoolean("foo true bar", /true/), true);
    strictEqual(_.toBoolean("foo FALSE bar", null, /FALSE/), false);
    strictEqual(_.toBoolean(" true  "), true);
  });

});
