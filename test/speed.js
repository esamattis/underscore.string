(function() {

  var numbers = [];
  for (var i=0; i<1000; i++) numbers.push(i);
  var objects = _.map(numbers, function(n){ return {num : n}; });
  var randomized = _.sortBy(numbers, function(){ return Math.random(); });

  JSLitmus.test('_.startsWith(): found', function() {
    return _.startsWith("foobar", "foo");
  });

  JSLitmus.test('_.startsWith(): not found', function() {
    return _.startsWith("crappyy fdssadfdsdfasfdds", "foo");
  });


})();
