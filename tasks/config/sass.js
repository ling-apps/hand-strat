module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            options: {
                compass: true
            },
            files: {
                '.tmp/public/styles/app.css': 'assets/styles/app.scss'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};