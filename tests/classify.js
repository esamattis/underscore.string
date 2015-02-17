var equal = require('assert').equal;
var classify = require('../classify');


test('#classify', function(){
  equal(classify(1), '1');
  equal(classify('some_class_name'), 'SomeClassName');
  equal(classify('my wonderfull class_name'), 'MyWonderfullClassName');
  equal(classify('my wonderfull.class.name'), 'MyWonderfullClassName');
  equal(classify('myLittleCamel'), 'MyLittleCamel');
  equal(classify('myLittleCamel.class.name'), 'MyLittleCamelClassName');
  equal(classify(123), '123');
  equal(classify(''), '');
  equal(classify(null), '');
  equal(classify(undefined), '');
});

