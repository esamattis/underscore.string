var exec = require('child_process').exec;
var version = require('../package.json').version;

exec('git tag -a ' + version + ' -m "' + version + '" && git push origin --tags');
