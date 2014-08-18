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
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

	grunt.config.set('watch', {
		scss: {
			// Assets to watch:
			files: ['assets/styles/**/*.scss'],

			// When assets are changed:
			tasks: ['clean:style' , 'sass:dev']
		},
        javascript: {
            files: ['assets/js/**/*'],
            tasks: ['clean:js', 'browserify:dev']
        }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
