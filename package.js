// package metadata file for Meteor.js

Package.describe({
  name: 'taskputty:underscore.string',
  summary: 'underscore.string packaging usable from Meteor packages, official version broken',
  version: '3.0.3_5',
  git: 'https://github.com/taskputty/underscore.string.git',
  documentation: 'README.markdown'
});


Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles(['meteor-pre.js','dist/underscore.string.js','meteor-post.js']);
  api.export("s");
});
