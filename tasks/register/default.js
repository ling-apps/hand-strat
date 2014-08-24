module.exports = function (grunt) {
  grunt.registerTask('default', ['clean:style', 'clean:js', 'clean:img', 'sass', 'browserify',  'watch']);
};
