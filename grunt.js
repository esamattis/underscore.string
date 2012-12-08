/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '//  <%= pkg.title || pkg.name %>' +
        '//  (c) <%= grunt.template.today("yyyy") %> Esa-Matti Suuronen <esa-matti aet suuronen dot org>\n' +
        '//  Underscore.string is freely distributable under the terms of the <%= _.pluck(pkg.licenses, "type").join(", ") %> license.\n' +
        '//  Documentation <%= pkg.homepage ? pkg.homepage : "" %>\n' +
        '//  Some code is borrowed from MooTools and Alexandru Marasteanu.\n' +
        '//  Version <%= pkg.version %>'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'watch'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Watch task.
  grunt.registerTask('watch', 'concat min');

  // Default task.
  grunt.registerTask('default', 'concat min qunit');

  // Travis Task
  grunt.registerTask('travis', 'concat min qunit');

};