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
            },
            "main": {
                configFile: 'frontend/jstests/main/karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            },
            "internal": {
                configFile: 'frontend/jstests/internal/karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            }
        },
        concat: {
            "copy-map": {
                files: {
                    'lolcomp/static/angular.min.js.map': 'frontend/vendor/angular/angular.min.js.map',
                    'lolcomp/static/angular-route.min.js.map': 'frontend/vendor/angular/angular-route.min.js.map',
                    'lolcomp/static/angular-animate.min.js.map': 'frontend/vendor/angular/angular-animate.min.js.map',
                    'lolcomp/static/bootstrap.css.map': 'frontend/vendor/bootstrap/bootstrap.css.map',
                }
            },
            // app sitedown
            "sitedown-js": {
                files: {
                    'tmp/sitedown.js': [
                        'frontend/vendor/angular/angular.min.js',
                        'frontend/vendor/angular-cookies/angular-cookies.min.js',
                        'frontend/vendor/angular-route/angular-route.min.js',
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
                        'lolcomp/static/style.css',
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
            },
            
            // app main
            "main-js": {
                files: {
                    'tmp/main.js': [
                        'frontend/vendor/angular/angular.min.js',
                        'frontend/vendor/**/*.js',
                        'frontend/app/main/app.js',
                        'tmp/main-templates.js',
                        'frontend/app/main/routing.js',
                        'frontend/app/main/**/*.js'
                    ]
                }
            },
            "main-nomin-js": {
                files: {
                    // destination : [source1, source2, ...]
                    'main/static/main.min.js': [
                        'tmp/main.js'
                    ]
                }
            },
            "main-scss": {
                files: {
                    'tmp/main.scss': [
                        'frontend/app/main/styles/base.scss',
                        'lolcomp/static/style.css',
                        'frontend/app/main/**/*.scss',
                    ]
                }
            },
            "main-css": {
                files: {
                    'tmp/scss': [
                        'frontend/vendor/**/*.css',
                        'tmp/main.scss.css',
                    ]
                }
            },
            "main-nomin-css": {
                files: {
                    'main/static/main.min.css': [
                        'tmp/main.css'
                    ]
                }
            },
            
            // app internal
            "internal-js": {
                files: {
                    'tmp/internal.js': [
                        'frontend/vendor/angular/angular.min.js',
                        'frontend/vendor/angular-cookies/angular-cookies.min.js',
                        'frontend/vendor/angular-route/angular-route.min.js',
                        'frontend/vendor/angular-animate/angular-animate.min.js',
                        'frontend/vendor/angular-aria/angular-aria.min.js',
                        'frontend/vendor/angular-material/angular-material.min.js',
                        'frontend/app/internal/app.js',
                        'tmp/internal-templates.js',
                        'frontend/app/internal/routing.js',
                        'frontend/app/internal/**/*.js'
                    ]
                }
            },
            "internal-nomin-js": {
                files: {
                    // destination : [source1, source2, ...]
                    'internal/static/internal.min.js': [
                        'tmp/internal.js'
                    ]
                }
            },
            "internal-scss": {
                files: {
                    'tmp/internal.scss': [
                        'frontend/app/internal/styles/base.scss',
                        'lolcomp/static/style.css',
                        'frontend/app/internal/styles/**/*.scss',
                        'frontend/app/internal/modules/**/*.scss',
                    ]
                }
            },
            "internal-css": {
                files: {
                    'tmp/internal.css': [
                        'frontend/vendor/angular-material/angular-material.min.css',
                        'tmp/internal.scss.css',
                    ]
                }
            },
            "internal-nomin-css": {
                files: {
                    'internal/static/internal.min.css': [
                        'tmp/internal.css'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            "sitedown": {
                files: {
                    'sitedown/static/sitedown.min.css': [
                        'tmp/sitedown.css'
                    ]
                }
            },
            "main": {
                files: {
                    'main/static/main.min.css': [
                        'tmp/main.css'
                    ]
                }
            },
            "internal": {
                files: {
                    'internal/static/internal.min.css': [
                        'tmp/internal.css'
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
            },
            "main": {
                options: {
                    style: 'string'
                },
                files: {
                    'tmp/main.scss.css': 'tmp/main.scss'
                }
            },
            "internal": {
                options: {
                    style: 'string'
                },
                files: {
                    'tmp/internal.scss.css': 'tmp/internal.scss'
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
            "main": {
                options: {
                    base: 'frontend/app/main/modules',
                    module: 'main.templates'
                },
                files: {
                    'tmp/main-templates.js': [
                        'frontend/app/main/modules/**/*.html'
                    ]
                }
            },
            "internal": {
                options: {
                    base: 'frontend/app/internal/modules',
                    module: 'internal.templates'
                },
                files: {
                    'tmp/internal-templates.js': [
                        'frontend/app/internal/modules/**/*.html'
                    ]
                }
            }
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
            "main": {
                files: {
                    'main/static/main.min.js': [
                        'tmp/main.js'
                    ]
                }
            },
            "internal": {
                files: {
                    'internal/static/internal.min.js': [
                        'tmp/internal.js'
                    ]
                }
            }
        },
        exec: {
            collectstatic: 'rm -rf lolcomp/staticfiles && python manage.py collectstatic --noinput',
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
            "main-dev": {
                files: [
                    'Gruntfile.js',
                    'frontend/**/*'
                ],
                tasks: [
                    'concat:main-scss',
                    'sass:main',
                    'concat:main-css',
                    'concat:main-nomin-css',
                    'html2js:main',
                    'concat:main-js',
                    'concat:main-nomin-js',
                    'exec:collectstatic'
                ]
            },
            "main-prod": {
                files: [
                    'Gruntfile.js',
                    'frontend/**/*'
                ],
                tasks: [
                    'concat:main-scss',
                    'sass:main',
                    'concat:main-css',
                    'cssmin:main',
                    'html2js:main',
                    'concat:main-js',
                    'uglify:main',
                    'exec:collectstatic'
                ]
            },
            "internal-dev": {
                files: [
                    'Gruntfile.js',
                    'frontend/**/*'
                ],
                tasks: [
                    'concat:internal-scss',
                    'sass:internal',
                    'concat:internal-css',
                    'concat:internal-nomin-css',
                    'html2js:internal',
                    'concat:internal-js',
                    'concat:internal-nomin-js',
                    'exec:collectstatic'
                ]
            },
            "internal-prod": {
                files: [
                    'Gruntfile.js',
                    'frontend/**/*'
                ],
                tasks: [
                    'concat:internal-scss',
                    'sass:internal',
                    'concat:internal-css',
                    'cssmin:internal',
                    'html2js:internal',
                    'concat:internal-js',
                    'uglify:internal',
                    'exec:collectstatic'
                ]
            }
        }
    });

    // grunt cmds for sitedown
    grunt.registerTask("test:sitedown", ["karma:sitedown"]);
    grunt.registerTask("watch:sitedown:dev", ["watch:sitedown-dev"]);
    grunt.registerTask("watch:sitedown:prod", ["watch:sitedown-prod"]);
    
    // grunt cmds for main
    grunt.registerTask("test:main", ["karma:main"]);
    grunt.registerTask("watch:main:dev", ["watch:main-dev"]);
    grunt.registerTask("watch:main:prod", ["watch:main-prod"]);
    
    // grunt cmds for internal
    grunt.registerTask("test:internal", ["karma:internal"]);
    grunt.registerTask("watch:internal:dev", ["watch:internal-dev"]);
    grunt.registerTask("watch:internal:prod", ["watch:internal-prod"]);
};