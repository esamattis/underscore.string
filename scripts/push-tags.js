var exec = require('child_process').exec;
var version = require('../package.json').version;

exec('git add -A && git commit -m "Version ' + version + '" && git push origin master && git tag -a ' + version + ' -m "' + version + '" && git push origin --tags && npm publish');
