var equal = require('assert').equal;
var capitalize = require('../capitalize');


test('#capitalize', function() {
  equal(capitalize('fabio'), 'Fabio', 'First letter is upper case');
  equal(capitalize('fabio'), 'Fabio', 'First letter is upper case');
  equal(capitalize('FOO'), 'FOO', 'Other letters unchanged');
  equal(capitalize('FOO', false), 'FOO', 'Other letters unchanged');
  equal(capitalize('foO', false), 'FoO', 'Other letters unchanged');
  equal(capitalize('FOO', true), 'Foo', 'Other letters are lowercased');
  equal(capitalize('foO', true), 'Foo', 'Other letters are lowercased');
  equal(capitalize('f', false), 'F', 'Should uppercase 1 letter');
  equal(capitalize('f', true), 'F', 'Should uppercase 1 letter');
  equal(capitalize('f'), 'F', 'Should uppercase 1 letter');
  equal(capitalize(123), '123', 'Non string');
  equal(capitalize(123, true), '123', 'Non string');
  equal(capitalize(123, false), '123', 'Non string');
  equal(capitalize(''), '', 'Capitalizing empty string returns empty string');
  equal(capitalize(null), '', 'Capitalizing null returns empty string');
  equal(capitalize(undefined), '', 'Capitalizing undefined returns empty string');
  equal(capitalize('', true), '', 'Capitalizing empty string returns empty string');
  equal(capitalize(null, true), '', 'Capitalizing null returns empty string');
  equal(capitalize(undefined, true), '', 'Capitalizing undefined returns empty string');
  equal(capitalize('', false), '', 'Capitalizing empty string returns empty string');
  equal(capitalize(null, false), '', 'Capitalizing null returns empty string');
  equal(capitalize(undefined, false), '', 'Capitalizing undefined returns empty string');
});

