var decap = require('./decapitalize');
var trim  = require('./trim');

module.exports = function decamelize(string, separator) {
	string = trim(string).split(/(?=[A-Z])/).map(function(word) {
		return decap(word);
	});
    return string.join(separator || '_');
};
