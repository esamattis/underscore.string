var equal = require('assert').equal;
var insert = require('../insert');


test('#insert', function(){
  equal(insert('Hello ', 6, 'Jessy'), 'Hello Jessy');
  equal(insert('Hello', 0, 'Jessy '), 'Jessy Hello');
  equal(insert('Hello ', 100, 'Jessy'), 'Hello Jessy');
  equal(insert('', 100, 'Jessy'), 'Jessy');
  equal(insert(null, 100, 'Jessy'), 'Jessy');
  equal(insert(undefined, 100, 'Jessy'), 'Jessy');
  equal(insert(12345, 5, 'Jessy'), '12345Jessy');
  equal(insert(12345, 3, 'Jessy'), '123Jessy45');
});

