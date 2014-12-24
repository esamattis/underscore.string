var makeString = require('./helper/makeString');
var include = require('./include');
module.exports = function includes(str, needles) {
    if (!needles.isArray()) {
        if (typeof needles !== 'string') return false;
        //convert string to array and allow search in
        //case people meaning to use include
        //call includes with string on accident.
        needles = [needles];
    }
    return needles.some(function (needle) {
        return include(str, needle);
    });
};


