module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    'pkg': grunt.file.readJSON('bower.json'),

    'gh-pages': {
      options: {
        base: 'docs'
      },
      src: ['**']
    },

    'ngdocs': {
      options: {
        html5Mode: false,
        titleLink: '#/api',
        navTemplate: './docs-template/nav.html',
        scripts: [
          './vendors/angular/angular.js',
          './vendors/angular-animate/angular-animate.js',
          './vendors/marked/lib/marked.js',
          './dist/<%= pkg.name %>.js',
          './docs-template/script.js'
        ],
        discussions: {
          shortName: 'hypercubedgithub',
          url: 'http://hypercubed.github.io/<%= pkg.name %>/',
          dev: false
        }
      },
      all: ['lib/<%= pkg.name %>.js']
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['ngdocs']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
};
