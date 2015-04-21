var equal = require('assert').equal;
var slugify = require('../slugify');


test('#slugify', function() {
  equal(slugify('Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/'), 'jack-jill-like-numbers-1-2-3-and-4-and-silly-characters');
  equal(slugify('Un éléphant à l\'orée du bois'), 'un-elephant-a-l-oree-du-bois');
  equal(slugify('I know latin characters: á í ó ú ç ã õ ñ ü ă ș ț'), 'i-know-latin-characters-a-i-o-u-c-a-o-n-u-a-s-t');
  equal(slugify('I am a word too, even though I am but a single letter: i!'), 'i-am-a-word-too-even-though-i-am-but-a-single-letter-i');
  equal(slugify('Some asian 天地人 characters'), 'some-asian-characters');
  equal(slugify(''), '');
  equal(slugify(null), '');
  equal(slugify(undefined), '');
});

