/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *     https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

  grunt.config.set('watch', {
    scss: {
      files: ['assets/styles/**/*.scss'],
      tasks: ['sass']
    },
    js: {
      files: ['assets/js/**/^[^_]*.js'],
      tasks: ['browserify']
    },
    img: {
      files: ['assets/images/**/*'],
      tasks: ['clean:img', 'copy:img']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
