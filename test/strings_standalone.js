$(document).ready(function() {

  module("String extensions");

  test("underscore not included", function() {
    throws(function(){
      _("foo");
    }, TypeError);
  });

  test("provides standalone functions", function() {
    equal(typeof _.str.trim, "function");
  });
});
