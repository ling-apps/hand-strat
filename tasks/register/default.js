module.exports = function (grunt) {
	grunt.registerTask('default', ['clean:js', 'clean:style', 'browserify:dev', 'sass:dev','watch']);
};
