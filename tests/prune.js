var equal = require('assert').equal;
var prune = require('../prune');


test('#prune', function(){
  equal(prune('Hello, cruel world', 6, ' read more'), 'Hello read more');
  equal(prune('Hello, world', 5, 'read a lot more'), 'Hello, world');
  equal(prune('Hello, world', 5), 'Hello...');
  equal(prune('Hello, world', 8), 'Hello...');
  equal(prune('Hello, cruel world', 15), 'Hello, cruel...');
  equal(prune('Hello world', 22), 'Hello world');
  equal(prune('Привет, жестокий мир', 6, ' read more'), 'Привет read more');
  equal(prune('Привет, мир', 6, 'read a lot more'), 'Привет, мир');
  equal(prune('Привет, мир', 6), 'Привет...');
  equal(prune('Привет, мир', 8), 'Привет...');
  equal(prune('Привет, жестокий мир', 16), 'Привет, жестокий...');
  equal(prune('Привет, мир', 22), 'Привет, мир');
  equal(prune('alksjd!!!!!!....', 100, ''), 'alksjd!!!!!!....');
  equal(prune(123, 10), '123');
  equal(prune(123, 1, 321), '321');
  equal(prune('', 5), '');
  equal(prune(null, 5), '');
  equal(prune(undefined, 5), '');
});

