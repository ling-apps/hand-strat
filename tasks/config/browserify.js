module.exports = function(grunt) {

    grunt.config.set('browserify', {
        options: {
            transform: [
                require('grunt-react').browserify
            ]
        },
        dev: {
            files: {
                '.tmp/public/js/app.js': ['assets/js/app.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};