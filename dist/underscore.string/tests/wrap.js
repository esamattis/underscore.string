var equal = require('assert').equal;
var wrap = require('../wrap');

test('#wrap', function(){

	// without trailing spaces
	equal(wrap("My name is", { width: 2, seperator:'.', cut:false, trailingSpaces:false } ), "My.name.is", 'works with width 2 and cut = false');
	equal(wrap("My name is", { width: 2, seperator:'.', cut:true, trailingSpaces:false } ), "My. n.am.e .is", 'works with width 2 and cut = true');
	equal(wrap("My name is", { width: 3, seperator:'.', cut:false, trailingSpaces:false } ), "My.name.is", 'works with width 3 and cut = true');
	equal(wrap("My name is", { width: 3, seperator:'.', cut:true, trailingSpaces:false } ), "My .nam.e i.s", 'works with width 3 and cut = true');

	// with trailing spaces
	equal(wrap("My name is", { width: 2, seperator:'.', cut:false, trailingSpaces:true } ), "My.name.is", 'works with width 2 and cut = false and trailingSpaces = true');
	equal(wrap("My name is", { width: 2, seperator:'.', cut:true, trailingSpaces:true } ), "My. n.am.e .is", 'works with width 2 and cut = true and trailingSpaces = true');
	equal(wrap("My name is", { width: 3, seperator:'.', cut:false, trailingSpaces:true } ), "My .name.is ", 'works with width 3 and cut = true and trailingSpaces = true');
	equal(wrap("My name is", { width: 3, seperator:'.', cut:true, trailingSpaces:true } ), "My .nam.e i.s  ", 'works with width 3 and cut = true and trailingSpaces = true');

	// with preserveSpaces
	equal(wrap('My name is', {width: 2, seperator:'.', cut:false, preserveSpaces:true }), 'My .name .is', 'preserve spaces keeps the space at the end of a line');
	equal(wrap('My name is', {width: 3, seperator:'.', cut:false, preserveSpaces:true }), 'My .name .is', 'preserve spaces keeps the space at the end of a line');

	// with preserveSpaces and trailingSpaces
	equal(wrap('My name is', {width: 2, seperator:'.', cut:false, preserveSpaces:true, trailingSpaces:true }), 'My .name .is', 'preserve spaces takes precedence over trailing spaces');


	// defaults
	equal(wrap("My name is", { width: 3 } ), "My\nname\nis", 'Default parameters work');
	equal(wrap("My name is"), "My name is", 'Default parameters work');
	equal(wrap("", { width: 5 } ), "", 'Empty string');
	equal(wrap("My name is", { width: 0 } ), "My name is", "Just return original line if width <= 0");
	equal(wrap("My name is", { width: -1 } ), "My name is", "Just return original line if width <= 0");
	equal(wrap(null, { width: 5 } ), "", 'null');
	equal(wrap(undefined, { width: 5 } ), "", 'undefined');

})