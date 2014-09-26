/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 *     https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

  grunt.config.set('browserify', {
    options: { transform: ['es6ify'] },
    dev: {
      files: {
        '.tmp/public/js/app.js': ['assets/js/app.js']
      }
    },
    build: {
      files: {
        'www/public/js/app.js': ['assets/js/app.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
