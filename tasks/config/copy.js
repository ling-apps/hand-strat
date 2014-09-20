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

  grunt.config.set('copy', {
    img: {
      files: [{expand: true, cwd: 'assets/images', src: ['**'], dest: '.tmp/public/images/'}]
    },
    js: {
      files: [
        {
          expand: true,
          cwd: 'assets/js/lib',
          src: ['**'],
          dest: '.tmp/public/js/'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
