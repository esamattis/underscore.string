module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '// <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '// Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; \n' +
        '// Underscore.string is freely distributable under the terms of the <%= _.pluck(pkg.licenses, "type").join(", ") %> license. \n' +
        '// Documentation: <%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '// Some code is borrowed from MooTools and Alexandru Marasteanu.\n' +
        '// Version <%= pkg.version %>'
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js']
    },
    concat: {
      lib: {
        src: ["<banner>","<file_strip_banner:lib/underscore.string.js>"],
        dest: "dist/underscore.string.js"
      }
    },
    min: {
      lib: {
        src: ["dist/underscore.string.js"],
        dest: "dist/underscore.string.min.js"
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'concat min'
    }
  });

  // Test task.
  grunt.registerTask('test', 'qunit');

  // Default task.
  grunt.registerTask('default', 'concat min test');

  // Travis test
  grunt.registerTask('travis', 'concat min test');

};