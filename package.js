// package metadata file for Meteor.js
var packageName = 'underscorestring:underscore.string'; // https://atmospherejs.com/underscorestring/underscore-string
var where = ''; // where to install: 'client' or 'server'. For both, pass nothing.
var version = "2.4.0";

Package.describe({
  "name": packageName,
  "summary": 'underscore.string (official) - string manipulation helpers.',
  "version": version,
  "git": 'https://github.com/epeli/underscore.string.git'
});

Npm.depends({
  "underscore.string": version
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.use('underscore', {weak: true});
  api.addFiles([
    'dist/underscore.string.min.js'
    ], ["client"]
  );
  api.addFiles([
    'meteor/export.js'
    ], ["client", "server"]
  );
  api.export('_s');
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use('tinytest', where);
  api.addFiles('meteor/test.js', where);
});