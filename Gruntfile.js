'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: false,
                eqeqeq: false,
                latedef: false,
                eqnull: true,
                expr: true,
                supernew: true,
                evil: true,
                boss: true,
                asi: true,
                laxbreak: true,
                browser: true,
                node: true
            },

            grunt: ['Gruntfile.js']
        },

        uglify: {
            options: {
                banner: '//  <%= pkg.name %>\n' +
                        '//  (c) <%= grunt.template.today("yyyy") %> Esa-Matti Suuronen <esa-matti aet suuronen dot org>\n' +
                        '//  Underscore.string is freely distributable under the terms of the <%= _.pluck(pkg.licenses, "type").join(", ") %> license.\n' +
                        '//  Documentation <%= pkg.homepage ? pkg.homepage : "" %>\n' +
                        '//  Some code is borrowed from MooTools and Alexandru Marasteanu.\n' +
                        '//  Version <%= pkg.version %>\n'
            },

            src: {
                files: {
                    'dist/underscore.string.min.js': 'lib/underscore.string.js'
                }
            }
        },

        qunit: {
            all: ['test/*.html']
        },
        
        watch: {
            src: {
                files: ['lib/underscore.string.js'],
                tasks: ['qunit', 'uglify']
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt']
            }
        }

    });

    grunt.registerTask('default', ['test', 'uglify']);
    
    grunt.registerTask('test', ['qunit']);

    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');


}