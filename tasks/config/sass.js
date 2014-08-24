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

  grunt.config.set('sass', {
    options: {},
    dev: {
      options: {
        trace: true,
        sourcemap: 'file',
        style: 'expanded',
        debugInfo: true,
        lineNumbers: true
      },
      files: {
        '.tmp/public/styles/main.css': 'assets/styles/main.scss'
      }
    },
    build: {
      options: {
        sourcemap: 'none'
      },
      files: {
        'www/public/styles/main.css': 'assets/styles/main.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
