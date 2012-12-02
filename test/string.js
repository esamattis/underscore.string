$(function(){
  module('underscore.string');

  function Assertion(method, args){
    this.method = method;
    this.args = args;
    this.object = args[0];
    this.wrappedArgs = args.slice(1);
  }

  $.extend(Assertion.prototype, {
    invokeStandalone: function(){
      return _.str[this.method].apply(_.str, this.args);
    },

    invokeUnderscored: function(){
      return _[this.method].apply(_, this.args);
    },

    invokeWrapped: function(){
      var object = _(this.object);
      return object[this.method].apply(object, this.wrappedArgs);
    },

    stringify: function(value){
      // TODO: figure out a better way to do that

      return JSON.stringify(value, function(_, value){
        var type = typeof(value);
        if ('undefined' === type)
          return type;
        else if ('number' === type && isNaN(value))
          return 'NaN';
        else
          return value;
      }).replace(/"(undefined|NaN)"/g, '$1');
    },

    _explainArgs: function(args){
      return '(' + this.stringify(args).replace(/^\[|\]$/g, '') + ')';
    },

    _explainExpectations: function(expectation){
      if ('undefined' === typeof(expectation)) return '';

      return ' == ' + this.stringify(expectation);
    },

    explainStandalone: function(expectation){
      return [ '_.str.',
        this.method,
        this._explainArgs(this.args),
        this._explainExpectations(expectation)
      ].join('');
    },

    explainUnderscored: function(expectation){
      return [
        '_.',
        this.method,
        this._explainArgs(this.args),
        this._explainExpectations(expectation)
      ].join('');
    },

    explainWrapped: function(expectation){
      return [
        '_(',
        this.stringify(this.object),
        ').',
        this.method,
        this._explainArgs(this.wrappedArgs),
        this._explainExpectations(expectation)
      ].join('');
    },

    equal: function(expectation, message){
      this.invokeTest(QUnit.equal, { expectation: expectation, message: message });
    },

    ok: function(message){
      this.invokeTest(QUnit.ok, { message: message });
    },

    notOk: function(message){
      // doing == false instead
      this.invokeTest(QUnit.equal, { expectation: false, message: message });
    },

    deepEqual: function(expectation, message){
      this.invokeTest(QUnit.deepEqual, { expectation: expectation, message: message });
    },

    invokeTest: function(testFunc, options){
      this.invokeTestFunc(testFunc, 'standalone', options);
      this.invokeTestFunc(testFunc, 'underscored', options);
      this.invokeTestFunc(testFunc, 'wrapped', options);
    },

    invokeTestFunc: function(test, type, options){
      type = type.charAt(0).toUpperCase() + type.slice(1);
      var args = [this['invoke'+type]()];
      if ('undefined' !== typeof(options.expectation)) args.push(options.expectation);
      var explanation = this['explain'+type](options.expectation);
      if (options.message) explanation = options.message + ': ' +  explanation;
      args.push(explanation);
      test.apply(QUnit, args);
    }

  });

  function assertMethod(methodName){
    return function(){
      return new Assertion(methodName, [].slice.call(arguments));
    }
  }

  test('isBlank', function(){
    var assert = assertMethod('isBlank');

    assert('').ok();
    assert(' ').ok();
    assert('\n').ok();
    assert(null).ok();
    assert(undefined).ok();
    assert('a').notOk();
    assert('0').notOk();
    assert(0).notOk();
  });

  test('stripTags', function() {
    var assert = assertMethod('stripTags');

    assert('a <a href="#">link</a>').equal('a link');
    assert('a <a href="#">link</a><script>alert("hello world!")</scr'+'ipt>').equal('a linkalert("hello world!")');
    assert('<html><body>hello world</body></html>').equal('hello world');
    assert(123).equal('123');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('capitalize', function(){
    var assert = assertMethod('capitalize');

    assert('fabio').equal('Fabio');
    assert('FOO').equal('FOO');
    assert(123).equal('123');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });


  test('chop', function(){
    var assert = assertMethod('chop');

    assert('whitespace', 2).deepEqual(['wh', 'it', 'es', 'pa', 'ce']);
    assert('whitespace', 3).deepEqual(['whi', 'tes', 'pac', 'e']);
    assert('whitespace').deepEqual(['whitespace']);
    assert(12345, 1).deepEqual(['1', '2', '3', '4', '5']);
  });

  test('clean', function() {
    var assert = assertMethod('clean');

    assert(' foo    bar   ').equal('foo bar');
    assert(123).equal('123');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('')
  });

  test('count', function(){
    var assert = assertMethod('count');

    assert('Hello world', 'l').equal(3);
    assert('Hello world', 'Hello').equal(1);
    assert('Hello world', 'foo').equal(0);
    assert('x.xx....x.x', 'x').equal(5);
    assert('', 'x').equal(0);
    assert(null, 'x').equal(0);
    assert(undefined, 'x').equal(0);
    assert(12345, 1).equal(1);
    assert(11345, 1).equal(2);
  });

  test('chars', function(){
    var assert = assertMethod('chars');

    assert('Hello').deepEqual(['H', 'e', 'l', 'l', 'o']);
    assert(123).deepEqual(['1', '2', '3']);
    assert('').deepEqual([]);
    assert(null).deepEqual([]);
    assert(undefined).deepEqual([]);
  });

  test('swapCase', function(){
    var assert = assertMethod('swapCase');

    assert('AaBbCcDdEe').equal('aAbBcCdDeE');
    assert('Hello World').equal('hELLO wORLD');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('escapeHTML', function(){
    var assert = assertMethod('escapeHTML');

    assert('<div>Blah & "blah" & \'blah\'</div>').equal('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &#39;blah&#39;&lt;/div&gt;');
    assert('&lt;').equal('&amp;lt;');
    assert(5).equal('5');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('unescapeHTML', function(){
    var assert = assertMethod('unescapeHTML');

    assert('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;').equal('<div>Blah & "blah" & \'blah\'</div>');
    assert('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &#39;blah&#39;&lt;/div&gt;').equal('<div>Blah & "blah" & \'blah\'</div>');
    assert('&amp;lt;').equal('&lt;');
    assert('&#39;').equal('\'');
    assert('&#0039;').equal('\'');
    assert('&#x4a;').equal('J');
    assert('&#x04A;').equal('J');
    assert('&#X4A;').equal('&#X4A;');
    assert('&_#39;').equal('&_#39;');
    assert('&#39_;').equal('&#39_;');
    assert('&amp;#38;').equal('&#38;');
    assert('&#38;amp;').equal('&amp;');
    assert('').equal('');
    assert(5).equal('5');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('escapeRegExp', function(){
    var assert = assertMethod('escapeRegExp');

    assert(/hello(?=\sworld)/.source).equal('hello\\(\\?\\=\\\\sworld\\)', 'with lookahead');
    assert(/hello(?!\shell)/.source).equal('hello\\(\\?\\!\\\\shell\\)', 'with negative lookahead');
  });

  test('splice', function(){
    var assert = assertMethod('splice');

    assert('https://edtsech@bitbucket.org/edtsech/underscore.strings', 30, 7, 'epeli').equal('https://edtsech@bitbucket.org/epeli/underscore.strings', 'Strings');
    assert(12345, 1, 2, 321).equal('132145', 'Non strings');
  });

  test('insert', function(){
    var assert = assertMethod('insert');

    assert('Hello ', 6, 'Jessy').equal('Hello Jessy');
    assert('Hello ', 100, 'Jessy').equal('Hello Jessy');
    assert('', 100, 'Jessy').equal('Jessy');
    assert(null, 100, 'Jessy').equal('Jessy');
    assert(undefined, 100, 'Jessy').equal('Jessy');
    assert(12345, 6, 'Jessy').equal('12345Jessy');
  });

  test('include', function(){
    var assert = assertMethod('include');

    assert('foobar', 'bar').ok()
    assert(12345, 34).ok()
    assert(null, '').ok('null includes empty string')
    assert('foobar', 'buzz').notOk('foobar does not include buzz');
    assert(12345, 6).notOk('12345 does not include 6');
    assert('', 34).notOk('empty string does not include 34');
    assert(null, 34).notOk('null does not include 34');
  });

  test('join', function(){
    var assert = assertMethod('join');

    assert('', 'foo', 'bar').equal('foobar');
    assert('', 1, 'foo', 2).equal('1foo2', 'join numbers and strings');
    assert(' ','foo', 'bar').equal('foo bar', 'join with spaces');
    assert('1', '2', '2').equal('212', 'join number strings');
    assert(1, 2, 2).equal('212', 'join numbers');
    assert('','foo', null).equal('foo', 'join null with string returns string');
    assert(null,'foo', 'bar').equal('foobar', 'join strings with null returns string');
    assert(null, 'foo', undefined, 'bar').equal('foobar', 'undefined is ignored');
  });

  test('lines', function(){
    var assert = assertMethod('lines');

    assert('Hello\nWorld').deepEqual(['Hello', 'World']);
    assert('Hello World').deepEqual(['Hello World']);
    assert(123).deepEqual(['123']);
    assert('').deepEqual(['']);
    assert(null).deepEqual([]);
    assert(undefined).deepEqual([]);
  });

  test('reverse', function(){
    var assert = assertMethod('reverse');

    assert('foo').equal('oof');
    assert('foobar').equal('raboof');
    assert('foo bar').equal('rab oof');
    assert(123).equal('321');
    assert(123.45).equal('54.321');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('startsWith', function(){
    var assert = assertMethod('startsWith');

    assert('foobar', 'foo').ok();
    assert(12345, 123).ok();
    assert(123.123, 123).ok();
    assert(123.123, 123.1).ok();
    assert('', '').ok();
    assert(null, '').ok();
    assert(undefined, '').ok();
    assert('oobar', 'foo').notOk();
    assert(2345, 123).notOk();
    assert(123.123, 123.2).notOk();
    assert(null, 'foo').notOk();
    assert(undefined, 'foo').notOk();
  });

  test('endsWith', function(){
    var assert = assertMethod('endsWith');

    assert('foobar', 'bar').ok();
    assert('im-a-pirate.mp3', 'mp3').ok();
    assert('fooba', 'bar').notOk();
    assert(12345, 45).ok();
    assert(12345, 6).notOk();
    assert('', '').ok();
    assert(null, '').ok();
    assert(null, 'foo').notOk();
  });

  test('succ', function(){
    var assert = assertMethod('succ');

    assert('a').equal('b');
    assert('A').equal('B');
    assert('+').equal(',');
    assert(1).equal('2');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('titleize', function(){
    var assert = assertMethod('titleize');

    assert('the titleize string method').equal('The Titleize String Method');
    assert('the titleize string  method').equal('The Titleize String  Method');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
    assert('let\'s have some fun').equal('Let\'s Have Some Fun');
    assert(123).equal('123');
  });

  test('camelize', function(){
    var assert = assertMethod('camelize');

    assert('the_camelize_string_method').equal('theCamelizeStringMethod');
    assert('-the-camelize-string-method').equal('TheCamelizeStringMethod');
    assert('the camelize string method').equal('theCamelizeStringMethod');
    assert(' the camelize  string method').equal('theCamelizeStringMethod');
    assert('the camelize   string method').equal('theCamelizeStringMethod');
    assert('-moz-transform').equal('MozTransform');
    assert('webkit-transform').equal('webkitTransform');
    assert('under_scored').equal('underScored');
    assert(' with   spaces').equal('withSpaces');;
    assert('').equal('');
    assert(123).equal('123');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('underscored', function(){
    var assert = assertMethod('underscored');

    assert('the-underscored-string-method').equal('the_underscored_string_method');
    assert('theUnderscoredStringMethod').equal('the_underscored_string_method');
    assert('TheUnderscoredStringMethod').equal('the_underscored_string_method');
    assert(' the underscored  string method').equal('the_underscored_string_method');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
    assert(123).equal('123');
  });

  test('dasherize', function(){
    var assert = assertMethod('dasherize');

    assert('the_dasherize_string_method').equal('the-dasherize-string-method');
    assert('TheDasherizeStringMethod').equal('-the-dasherize-string-method');
    assert('thisIsATest').equal('this-is-a-test');
    assert('this Is A Test').equal('this-is-a-test');
    assert('thisIsATest123').equal('this-is-a-test123');
    assert('123thisIsATest').equal('123this-is-a-test');
    assert('the dasherize string method').equal('the-dasherize-string-method');
    assert('the  dasherize string method  ').equal('the-dasherize-string-method');
    assert('téléphone').equal('téléphone');
    assert('foo$bar').equal('foo$bar');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
    assert(123).equal('123');
  });

  test('classify', function(){
    var assert = assertMethod('classify');

    assert('some_class_name').equal('SomeClassName');
    assert('my wonderfull class_name').equal('MyWonderfullClassName');
    assert('my wonderfull.class.name').equal('MyWonderfullClassName');
    assert(1).equal('1');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('humanize', function(){
    var assert = assertMethod('humanize');

    assert('the_humanize_string_method').equal('The humanize string method');
    assert('ThehumanizeStringMethod').equal('Thehumanize string method');
    assert('the humanize string method').equal('The humanize string method');
    assert('the humanize_id string method_id').equal('The humanize id string method');
    assert('the  humanize string method  ').equal('The humanize string method');
    assert('   capitalize dash-CamelCase_underscore trim  ').equal('Capitalize dash camel case underscore trim');
    assert(123).equal('123');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('trim', function(){
    var assert = assertMethod('trim');

    assert(' foo').equal('foo');
    assert('foo ').equal('foo');
    assert(' foo ').equal('foo');
    assert('    foo     ').equal('foo');
    assert('\t    foo \t  ', /\s/).equal('foo');
    assert('ffoo', 'f').equal('oo');
    assert('ooff', 'f').equal('oo');
    assert('ffooff', 'f').equal('oo');
    assert('_-foobar-_', '_-').equal('foobar');
    assert('http://foo/', '/').equal('http://foo');
    assert('c:\\', '\\').equal('c:');
    assert(123).equal('123');
    assert(123, 3).equal('12');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('ltrim', function(){
    var assert = assertMethod('ltrim');

    assert(' foo').equal('foo');
    assert('    foo').equal('foo');
    assert('foo ').equal('foo ');
    assert(' foo ').equal('foo ');
    assert('ffoo', 'f').equal('oo');
    assert('ooff', 'f').equal('ooff');
    assert('ffooff', 'f').equal('ooff');
    assert('_-foobar-_', '_-').equal('foobar-_');
    assert('_-foobar-_', '_-').equal('foobar-_');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
    assert(123, 1).equal('23');
  });

  test('rtrim', function(){
    var assert = assertMethod('rtrim');

    assert('http://foo/', '/').equal('http://foo');
    assert(' foo').equal(' foo');
    assert('foo ').equal('foo');
    assert('foo     ').equal('foo');
    assert('foo  bar     ').equal('foo  bar');
    assert(' foo ').equal(' foo');
    assert('ffoo', 'f').equal('ffoo');
    assert('ooff', 'f').equal('oo');
    assert('ffooff', 'f').equal('ffoo');
    assert('_-foobar-_', '_-').equal('_-foobar');
    assert(123, 3).equal('12');
    assert('').equal('');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('truncate', function(){
    var assert = assertMethod('truncate');

    assert('Hello world', 6, 'read more').equal('Hello read more');
    assert('Hello world', 5).equal('Hello...');
    assert('Hello', 10).equal('Hello');
    assert('', 10).equal('');
    assert(null, 10).equal('');
    assert(undefined, 10).equal('');
    assert(1234567890, 5).equal('12345...');
  });

  test('prune', function(){
    var assert = assertMethod('prune');

    assert('Hello, cruel world', 6, ' read more').equal('Hello read more');
    assert('Hello, world', 5, 'read a lot more').equal('Hello, world');
    assert('Hello, world', 5).equal('Hello...');
    assert('Hello, world', 8).equal('Hello...');
    assert('Hello, cruel world', 15).equal('Hello, cruel...');
    assert('Hello world', 22).equal('Hello world');
    assert('Привет, жестокий мир', 6, ' read more').equal('Привет read more');
    assert('Привет, мир', 6, 'read a lot more').equal('Привет, мир');
    assert('Привет, мир', 6).equal('Привет...');
    assert('Привет, мир', 8).equal('Привет...');
    assert('Привет, жестокий мир', 16).equal('Привет, жестокий...');
    assert('Привет, мир', 22).equal('Привет, мир');
    assert('alksjd!!!!!!....', 100, '').equal('alksjd!!!!!!....');
    assert(123, 10).equal('123');
    assert(123, 1, 321).equal('321');
    assert('', 5).equal('');
    assert(null, 5).equal('');
    assert(undefined, 5).equal('');
  });

  test('words', function(){
    var assert = assertMethod('words');

    assert('I love you!').deepEqual(['I', 'love', 'you!']);
    assert(' I    love   you!  ').deepEqual(['I', 'love', 'you!']);
    assert('I_love_you!', '_').deepEqual(['I', 'love', 'you!']);
    assert('I-love-you!', /-/).deepEqual(['I', 'love', 'you!']);
    assert(123).deepEqual(['123']);
    assert(0).deepEqual(['0']);
    assert('').deepEqual([]);
    assert('   ').deepEqual([]);
    assert(null).deepEqual([]);
    assert(undefined).deepEqual([]);
  });

  test('pad', function(){
    var assert = assertMethod('pad');

    assert('1', 8).equal('       1');
    assert(1, 8).equal('       1');
    assert('1', 8, '0').equal('00000001');
    assert('1', '8', 0).equal('00000001');
    assert('1', 8, '0', 'left').equal('00000001');
    assert('1', 8, '0', 'right').equal('10000000');
    assert('1', 8, '0', 'both').equal('00001000');
    assert('foo', 8, '0', 'both').equal('000foo00');
    assert('foo', 7, '0', 'both').equal('00foo00');
    assert('foo', 7, '!@$%dofjrofj', 'both').equal('!!foo!!');
    assert('', 2).equal('  ');
    assert(null, 2).equal('  ');
    assert(undefined, 2).equal('  ');
  });

  test('lpad', function(){
    var assert = assertMethod('lpad');

    assert('1', 8).equal('       1');
    assert(1, 8).equal('       1');
    assert('1', 8, '0').equal('00000001');
    assert('1', '8', 0).equal('00000001');
    assert('1', 8, '0', 'left').equal('00000001');
    assert('', 2).equal('  ');
    assert(null, 2).equal('  ');
    assert(undefined, 2).equal('  ');
  });

  test('rpad', function(){
    var assert = assertMethod('rpad');

    assert('1', 8).equal('1       ');
    assert('1', 8, '0').equal('10000000');
    assert('1', '8', 0).equal('10000000');
    assert('foo', 8, '0').equal('foo00000');
    assert('foo', 7, '0').equal('foo0000');
    assert('', 2).equal('  ');
    assert(null, 2).equal('  ');
    assert(undefined, 2).equal('  ');
  });

  test('lrpad', function(){
    var assert = assertMethod('lrpad');

    assert('1', 8).equal('    1   ');
    assert(1, 8).equal('    1   ');
    assert('1', 8, '0').equal('00001000');
    assert('foo', 8, '0').equal('000foo00');
    assert('foo', 7, '0').equal('00foo00');
    assert('foo', 7, '!@$%dofjrofj').equal('!!foo!!');
    assert('', 2).equal('  ');
    assert(null, 2).equal('  ');
    assert(undefined, 2).equal('  ');
  });

  test('sprintf', function(){
    // Should be well quite tested already.
    // http://www.diveintojavascript.com/projects/sprintf-for-javascript
    var assert = assertMethod('sprintf');

    assert('Hello %s', 'me').equal('Hello me');
    assert('%.1f', 1.22222).equal('1.2');
    assert('%.1f', 1.17).equal('1.2');
    assert('%(id)d - %(name)s', {id: 824, name: 'Hello World'}).equal('824 - Hello World');
    assert('%(args[0].id)d - %(args[1].name)s', {args: [{id: 824}, {name: 'Hello World'}]}).equal('824 - Hello World');
  });

  test('vsprintf', function(){
    var assert = assertMethod('vsprintf');

    assert('Hello %s', ['me']).equal('Hello me');
    assert('Hello %s', ['me']).equal('Hello me');
    assert('%.1f', [1.22222]).equal('1.2');
    assert('%.1f', [1.17]).equal('1.2');
    assert('%(id)d - %(name)s', [{id: 824, name: 'Hello World'}]).equal('824 - Hello World');
    assert('%(args[0].id)d - %(args[1].name)s', [{args: [{id: 824}, {name: 'Hello World'}]}]).equal('824 - Hello World');
  });

  test('toNumber', function(){
    var assert = assertMethod('toNumber');

    assert('not a number').deepEqual(NaN);
    assert(0).equal(0);
    assert('0').equal(0);
    assert('0.0').equal(0);
    assert('0.1').equal(0);
    assert('0.1', 1).equal(0.1);
    assert(' 0.1   ', 1).equal(0.1);
    assert('0000').equal(0);
    assert('2.345').equal(2);
    assert('2.345', NaN).equal(2);
    assert('2.345', 2).equal(2.35);
    assert('2.344', 2).equal(2.34);
    assert('2', 2).equal(2.00);
    assert(2, 2).equal(2.00);
    assert(-2).equal(-2);
    assert('-2').equal(-2);
    assert('').equal(0);
    assert(null).equal(0);
    assert(undefined).equal(0);
  });

  test('numberFormat', function(){
    var assert = assertMethod('numberFormat');

    assert(9000).equal('9,000');
    assert('9000').equal('9,000');
    assert(9000, 0).equal('9,000');
    assert(9000, 0, '', '').equal('9000');
    assert(90000, 2).equal('90,000.00');
    assert(90000, '2').equal('90,000.00');
    assert('90000', '2').equal('90,000.00');
    assert('90000', 2).equal('90,000.00');
    assert(1000.754).equal('1,001');
    assert(1000.754, 2).equal('1,000.75');
    assert(1000.754, 0, ',', '.').equal('1.001');
    assert(1000.754, 2, ',', '.').equal('1.000,75');
    assert(1000000.754, 2, ',', '.').equal('1.000.000,75');
    assert(1000000000).equal('1,000,000,000');
    assert(100000000).equal('100,000,000');
    assert('not number').equal('');
    assert().equal('');
    assert(null, '.', ',').equal('');
    assert(undefined, '.', ',').equal('');
    assert(new Number(5000)).equal('5,000');
  });

  test('strRight', function(){
    var assert = assertMethod('strRight');

    assert('This_is_a_test_string', '_').equal('is_a_test_string');
    assert('This_is_a_test_string', 'string').equal('');
    assert('This_is_a_test_string').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '-').equal('This_is_a_test_string');
    assert('', 'foo').equal('');
    assert(12345, 2).equal('345');
    assert(null, 'foo').equal('');
    assert(undefined, 'foo').equal('');
  });

  test('strRightBack', function(){
    var assert = assertMethod('strRightBack');

    assert('This_is_a_test_string', '_').equal('string');
    assert('This_is_a_test_string', 'string').equal('');
    assert('This_is_a_test_string').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '-').equal('This_is_a_test_string');
    assert('', 'foo').equal('');
    assert(12345, 2).equal('345');
    assert(null, 'foo').equal('');
    assert(undefined, 'foo').equal('');
  });

  test('strLeft', function(){
    var assert = assertMethod('strLeft');

    assert('This_is_a_test_string', '_').equal('This');
    assert('This_is_a_test_string', 'This').equal('');
    assert('This_is_a_test_string').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '-').equal('This_is_a_test_string');
    assert('', 'foo').equal('');
    assert(null, 'foo').equal('');
    assert(undefined, 'foo').equal('');
    assert(123454321, 3).equal('12');
  });

  test('strLeftBack', function(){
    var assert = assertMethod('strLeftBack');

    assert('This_is_a_test_string', '_').equal('This_is_a_test');
    assert('This_is_a_test_string', 'This').equal('');
    assert('This_is_a_test_string').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '').equal('This_is_a_test_string');
    assert('This_is_a_test_string', '-').equal('This_is_a_test_string');
    assert('', 'foo').equal('');
    assert(null, 'foo').equal('');
    assert(undefined, 'foo').equal('');
    assert(123454321, 3).equal('123454');
  });

  test('toSentence', function(){
    var assert = assertMethod('toSentence');

    assert(['jQuery']).equal('jQuery');
    assert(['jQuery', 'MooTools']).equal('jQuery and MooTools');
    assert(['jQuery', 'MooTools', 'Prototype']).equal('jQuery, MooTools and Prototype');
    assert(['jQuery', 'MooTools', 'Prototype', 'YUI']).equal('jQuery, MooTools, Prototype and YUI');
    assert(['jQuery', 'MooTools', 'Prototype'], ',', ' or ').equal('jQuery,MooTools or Prototype');
  });

  test('toSentenceSerial', function(){
    var assert = assertMethod('toSentenceSerial');

    assert(['jQuery']).equal('jQuery');
    assert(['jQuery', 'MooTools']).equal('jQuery and MooTools');
    assert(['jQuery', 'MooTools', 'Prototype']).equal('jQuery, MooTools, and Prototype');
  });

  test('slugify', function(){
    var assert = assertMethod('slugify');

    assert('Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/').equal('jack-jill-like-numbers-123-and-4-and-silly-characters');
    assert('Un éléphant à l\'orée du bois').equal('un-elephant-a-loree-du-bois');
    assert('I know latin characters: á í ó ú ç ã õ ñ ü').equal('i-know-latin-characters-a-i-o-u-c-a-o-n-u');
    assert('I am a word too, even though I am but a single letter: i!').equal('i-am-a-word-too-even-though-i-am-but-a-single-letter-i');
    assert('').equal('');
    assert(123).equal('123');
    assert(null).equal('');
    assert(undefined).equal('');
  });

  test('surround', function(){
    var assert = assertMethod('surround');

    assert('foo', 'ab').equal('abfooab');
    assert(1, 'ab').equal('ab1ab');
    assert(1, 2).equal('212');
    assert('foo', 1).equal('1foo1');
    assert('', 1).equal('11');
    assert(null, 1).equal('11');
    assert('foo', '').equal('foo');
    assert('foo', null).equal('foo');
  });


  test('quote', function(){
    var assert = assertMethod('quote');

    assert('foo').equal('"foo"');
    assert('"foo"').equal('""foo""');
    assert(1).equal('"1"');
    assert(null).equal('""');
    assert(undefined).equal('""');
  });

  test('repeat', function(){
    var assert = assertMethod('repeat');

    assert('foo').equal('');
    assert('foo', 3).equal('foofoofoo');
    assert('foo', '3').equal('foofoofoo');
    assert(123, 2).equal('123123');
    assert(1234, 2, '*').equal('1234*1234');
    assert(1234, 2, 5).equal('123451234');
    assert('', 2).equal('');
    assert(null, 2).equal('');
    assert(undefined, 2).equal('');
  });

  test('levenshtein', function(){
    var assert = assertMethod('levenshtein');

    assert('Godfather', 'Godfather').equal(0);
    assert('Godfather', 'Godfathe').equal(1);
    assert('Godfather', 'odfather').equal(1);
    assert('Godfather', 'Gdfthr').equal(3);
    assert('seven', 'eight').equal(5);
    assert('123', 123).equal(0);
    assert(321, '321').equal(0);
    assert('lol', null).equal(3);
    assert('lol').equal(3);
    assert(null, 'lol').equal(3);
    assert(undefined, 'lol').equal(3);
    assert().equal(0);
  });

});
