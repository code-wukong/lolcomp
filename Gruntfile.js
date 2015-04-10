module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
        karma: {
            "sitedown": {
                configFile: 'frontend/jstests/sitedown/karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            }
        },
        concat: {
            "copy-js-map": {
                files: {
                    'lolcomp/static/angular.min.js.map': 'frontend/vendor/angular/angular.min.js.map',
                    'lolcomp/static/angular-route.min.js.map': 'frontend/vendor/angular/angular-route.min.js.map'
                }
            },
            "sitedown-js": {
                files: {
                    'tmp/sitedown.js': [
                        'frontend/vendor/angular/angular.min.js',
                        'frontend/vendor/**/*.js',
                        'frontend/app/sitedown/app.js',
                        'tmp/sitedown-templates.js',
                        'frontend/app/sitedown/routing.js',
                        'frontend/app/sitedown/**/*.js'
                    ]
                }
            },
            "sitedown-nomin-js": {
                files: {
                    // destination : [source1, source2, ...]
                    'sitedown/static/sitedown.min.js': [
                        'tmp/sitedown.js'
                    ]
                }
            },
            "sitedown-scss": {
                files: {
                    'tmp/sitedown.scss': [
                        'frontend/app/sitedown/styles/base.scss',
                        'frontend/app/sitedown/**/*.scss',
                    ]
                }
            },
            "sitedown-css": {
                files: {
                    'tmp/sitedown.css': [
                        'frontend/vendor/**/*.css',
                        'tmp/sitedown.scss.css',
                    ]
                }
            },
            "sitedown-nomin-css": {
                files: {
                    'sitedown/static/sitedown.min.css': [
                        'tmp/sitedown.css'
                    ]
                }
            }
        },
        cssmin: {
            ooptions: {
                sourceMap: true
            },
            "sitedown": {
                files: {
                    'sitedown/static/sitedown.min.css': [
                        'tmp/sitedown.css'
                    ]
                }
            }
        },
        sass: {
            "sitedown": {
                options: {
                    style: 'string'
                },
                files: {
                    // destination : source
                    'tmp/sitedown.scss.css': 'tmp/sitedown.scss'
                }
            }
        },
        html2js: {
            "sitedown": {
                options: {
                    base: 'frontend/app/sitedown/modules',
                    module: 'sitedown.templates'
                },
                files: {
                    'tmp/sitedown-templates.js': [
                        'frontend/app/sitedown/modules/**/*.html'
                    ]
                }
            },
        },
        uglify: {
            options: {
                sourceMap: false,
                sourceMapIncludeSources: false
            },
            "sitedown": {
                files: {
                    'sitedown/static/sitedown.min.js': [
                        'tmp/sitedown.js'
                    ]
                }
            },
        },
        exec: {
            collectstatic: 'rm -rf lolcomp/staticfiles && python manage.py collectstatic --noinput',
            'create-fake-css-map': 'echo "" > lolcomp/static/sitedown.scss.css.map'
        },
        watch: {
            options: {
                atBegin: true
            },
            "sitedown-dev": {
                files: [
                    'Gruntfile.js',
                    'frontend/**/*'
                ],
                tasks: [
                    'exec:create-fake-css-map',
                    'concat:copy-js-map',
                    'concat:sitedown-scss',
                    'sass:sitedown',
                    'concat:sitedown-css',
                    'concat:sitedown-nomin-css',
                    'html2js:sitedown',
                    'concat:sitedown-js',
                    'concat:sitedown-nomin-js',
                    'exec:collectstatic'
                ]
            },
            "sitedown-prod": {
                files: [
                    'Gruntfile.js',
                    'frontend/**/*'
                ],
                tasks: [
                    'concat:copy-js-map',
                    'concat:sitedown-scss',
                    'sass:sitedown',
                    'concat:sitedown-css',
                    'cssmin:sitedown',
                    'html2js:sitedown',
                    'concat:sitedown-js',
                    'uglify:sitedown',
                    'exec:collectstatic'
                ]
            },
        }
    });

    // app sitedown
    grunt.registerTask("test:sitedown", ["karma:sitedown"]);
    grunt.registerTask("watch:sitedown:dev", ["watch:sitedown-dev"]);
    grunt.registerTask("watch:sitedown:prod", ["watch:sitedown-prod"]);
};