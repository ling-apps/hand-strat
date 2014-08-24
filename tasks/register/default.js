module.exports = function (grunt) {
  grunt.registerTask('default', ['clean:style', 'clean:js', 'clean:img', 'copy:img', 'sass:dev', 'browserify:dev',  'watch']);
};
