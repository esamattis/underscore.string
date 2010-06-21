$(document).ready(function() {

  module("String extensions");

  test("Strings: basic", function() {
    equals(_.trim("   epeli  "), "epeli", "Basic");  
    equals(_.strip("   epeli  "), "epeli", "Aliases");    
    equals(_("   epeli  ").trim(), "epeli", "Object-Oriented style");
    equals(_("   epeli  ").chain().trim().capitalize().value(), "Epeli", "Can chain");
  });


  test("Strings: capitalize", function() {
    equals(_("fabio").capitalize(), "Fabio", 'First letter is upper case');
    equals(_.capitalize("fabio"), "Fabio", 'First letter is upper case');
  });


  test("Strings: trim", function() {
    equals(_(" foo").trim(), "foo");
    equals(_("foo ").trim(), "foo");
    equals(_(" foo ").trim(), "foo");
    equals(_("    foo     ").trim(), "foo");
    equals(_("    foo     ", " ").trim(), "foo", "Manually set whitespace");

    equals(_("ffoo").trim("f"), "oo");
    equals(_("ooff").trim("f"), "oo");
    equals(_("ffooff").trim("f"), "oo");


    equals(_("_-foobar-_").trim("_-"), "foobar");

    equals(_("http://foo/").trim("/"), "http://foo");
    equals(_("c:\\").trim('\\'), "c:");


  });

  test("Strings: ltrim", function() {
    equals(_(" foo").ltrim(), "foo");
    equals(_("    foo").ltrim(), "foo");
    equals(_("foo ").ltrim(), "foo ");
    equals(_(" foo ").ltrim(), "foo ");


    equals(_("ffoo").ltrim("f"), "oo");
    equals(_("ooff").ltrim("f"), "ooff");
    equals(_("ffooff").ltrim("f"), "ooff");

    equals(_("_-foobar-_").ltrim("_-"), "foobar-_");
  });

  test("Strings: rtrim", function() {
    equals(_("http://foo/").rtrim("/"), "http://foo", 'clean trailing slash');
    equals(_(" foo").rtrim(), " foo");
    equals(_("foo ").rtrim(), "foo");
    equals(_("foo     ").rtrim(), "foo");
    equals(_("foo  bar     ").rtrim(), "foo  bar");
    equals(_(" foo ").rtrim(), " foo");


    equals(_("ffoo").rtrim("f"), "ffoo");
    equals(_("ooff").rtrim("f"), "oo");
    equals(_("ffooff").rtrim("f"), "ffoo");

    equals(_("_-foobar-_").rtrim("_-"), "_-foobar");

  });

  test("Strings: rtrim", function() {
    equals(_(" foo").rtrim(), " foo");
    equals(_("foo ").rtrim(), "foo");
    equals(_(" foo ").rtrim(), " foo");
  });

  test("Strings: clean", function() {
    equals(_(" foo    bar   ").clean(), "foo bar");
  });



  test("Strings: sprintf", function() {
    // Should be very tested function already.  Thanks to
    // http://www.diveintojavascript.com/projects/sprintf-for-javascript
    equals(_.sprintf("Hello %s", "me"), "Hello me", 'basic');
    equals(_("Hello %s").sprintf("me"), "Hello me", 'object');
    equals(_("hello %s").chain().sprintf("me").capitalize().value(), "Hello me", 'Chaining works');
    equals(_.sprintf("%.1f", 1.22222), "1.2", 'round');
    equals(_.sprintf("%.1f", 1.17), "1.2", 'round 2');

  });


  test("Strings: startsWith", function() {
    ok(_("foobar").startsWith("foo"), 'foobar starts with foo');
    ok(!_("oobar").startsWith("foo"), 'oobar does not start with foo');
  });

  test("Strings: endsWith", function() {
    ok(_("foobar").endsWith("bar"), 'foobar ends with bar');
    ok(_.endsWith("foobar", "bar"), 'foobar ends with bar');
    ok(_.endsWith("00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4", "mp4"), 'endsWith .mp4');
    ok(!_("fooba").endsWith("bar"), 'fooba does not end with bar');
  });


  test("Strings: contains", function() {
    ok(_("foobar").contains("bar"), 'foobar contains bar');
    ok(!_("foobar").contains("buzz"), 'foobar does not contain buzz');
  });


});
