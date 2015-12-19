module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Project configuration.
    grunt.initConfig({

        /* DEV MODE - auto compile & test */
        'watch': {
            'src': {
                files: ['assets/scss/*.scss'],
                tasks: ['compass:dev']
            }
        },

        compass: {
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    imagesDir: './assets/images',
                    generatedImagesDir: './public/img',
                    relativeAssets: true,
                    sassDir: './assets/scss',
                    cssDir: './public/css'
                }
            }
        }
    });

    grunt.registerTask('default', ['compass:dev', 'watch']);
};
