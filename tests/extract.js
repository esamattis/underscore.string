var deepEqual = require('assert').deepEqual;
var extract = require('../extract');


test('#extract', function(){
  deepEqual(extract(null, 'My name is Bob and I like sponges'), null);
  deepEqual(extract('My name is Bob and I like sponges', null), null);
  deepEqual(extract('My name is Bob and I like sponges', 'My name is Bob and I am a builder'), null);
  deepEqual(extract('My name is Bob and I like sponges', 'My name is Bob and I like sponges'), []);
  deepEqual(extract('My name is {0} and I like sponges', 'My name is Bob and I like sponges'), ['Bob']);
  deepEqual(extract('My name is Bob and I like {0}', 'My name is Bob and I like sponges'), ['sponges']);
  deepEqual(extract('My name is {0} and I like square pants', 'My name is Sponge Bob and I like square pants'), ['Sponge Bob']);
  deepEqual(extract('My name is {1} and I like sponges', 'My name is Bob and I like sponges'), null);
  deepEqual(extract('My name is {1} and I like sponges', 'My name is {1} and I like sponges'), []);
  deepEqual(extract('My name is {0}Bob and I like sponges', 'My name is Bob and I like sponges'), null);
  deepEqual(extract('My name is {0} and I like {1}', 'My name is Bob and I like sponges'), ['Bob', 'sponges']);
  deepEqual(extract('My name is {1} and I like {0}', 'My name is Bob and I like sponges'), ['sponges', 'Bob']);
  deepEqual(extract('My name is {0} and I like {1}', 'Your name is Bob and you like sponges'), null);
  deepEqual(extract('Our names are {0} & {0} and we like {1} & {1}', 'Our names are Bob & {0} and we like sponges & {1}'), ['Bob', 'sponges']);
  deepEqual(extract('My name is [B|o|b] and {I}+ like (.+) & {0}', 'My name is [B|o|b] and {I}+ like (.+) & sponges'), ['sponges']);
});
