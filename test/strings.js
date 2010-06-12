$(document).ready(function() {

  module("String extensions");

  test("Strings: capitalize", function() {
    equals(_("fabio").capitalize(), "Fabio", 'First letter is upper case');
    equals(_.capitalize("fabio"), "Fabio", 'First letter is upper case');
  });


  test("Strings: strip", function() {
    equals(_(" foo").strip(), "foo");
    equals(_("foo ").strip(), "foo");
    equals(_(" foo ").strip(), "foo");
    equals(_("    foo     ").strip(), "foo");

    equals(_("ffoo").strip("f"), "oo");
    equals(_("ooff").strip("f"), "oo");
    equals(_("ffooff").strip("f"), "oo");


    equals(_("_-foobar-_").strip("_-"), "foobar");

    equals(_("http://foo/").strip("/"), "http://foo");
    equals(_("c:\\").strip('\\'), "c:");


  });

  test("Strings: lstrip", function() {
    equals(_(" foo").lstrip(), "foo");
    equals(_("    foo").lstrip(), "foo");
    equals(_("foo ").lstrip(), "foo ");
    equals(_(" foo ").lstrip(), "foo ");


    equals(_("ffoo").lstrip("f"), "oo");
    equals(_("ooff").lstrip("f"), "ooff");
    equals(_("ffooff").lstrip("f"), "ooff");

    equals(_("_-foobar-_").lstrip("_-"), "foobar-_");
  });

  test("Strings: rstrip", function() {
    equals(_("http://foo/").rstrip("/"), "http://foo", 'clean trailing slash');
    equals(_(" foo").rstrip(), " foo");
    equals(_("foo ").rstrip(), "foo");
    equals(_("foo     ").rstrip(), "foo");
    equals(_("foo  bar     ").rstrip(), "foo  bar");
    equals(_(" foo ").rstrip(), " foo");


    equals(_("ffoo").rstrip("f"), "ffoo");
    equals(_("ooff").rstrip("f"), "oo");
    equals(_("ffooff").rstrip("f"), "ffoo");

    equals(_("_-foobar-_").rstrip("_-"), "_-foobar");

  });

  test("Strings: rstrip", function() {
    equals(_(" foo").rstrip(), " foo");
    equals(_("foo ").rstrip(), "foo");
    equals(_(" foo ").rstrip(), " foo");
  });

  test("Strings: clean", function() {
    equals(_(" foo    bar   ").clean(), "foo bar");
  });



  test("Strings: sprintf", function() {
    // Should be very tested function already.  Thanks to
    // http://www.diveintojavascript.com/projects/sprintf-for-javascript
    equals(_.sprintf("Hello %s", "me"), "Hello me", 'basic');
    equals(_("Hello %s").sprintf("me"), "Hello me", 'object');
    equals(_("hello %s").chain().sprintf("me").capitalize().value(), "Hello me", 'Chaingin works');
    equals(_.sprintf("%.1f", 1.22222), "1.2", 'round');
    equals(_.sprintf("%.1f", 1.17), "1.2", 'round 2');

  });


  test("Strings: startsWith", function() {
    ok(_("foobar").startsWith("foo"), 'foobar starts with foo');
    ok(!_("oobar").startsWith("foo"), 'oobar does not start with foo');
  });

  test("Strings: endsWith", function() {
    ok(_("foobar").endsWith("bar"), 'foobar ends with bar');
    ok(!_("fooba").endsWith("bar"), 'fooba does not end with bar');
  });


  test("Strings: contains", function() {
    ok(_("foobar").contains("bar"), 'foobar contains bar');
    ok(!_("foobar").contains("buzz"), 'foobar does not contain buzz');
  });


});
