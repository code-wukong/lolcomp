module.exports = function(config) {
  config.set({
    files : [
        'main/static/main.min.js',
        
        'frontend/jstests/helpers/angular-mocks.js',
        'frontend/jstests/helpers/helpers.js',
        
        'frontend/jstests/main/unit/**/*.spec.js',
    ],
    basePath: '../../../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    client: {captureConsole: true},
    browsers: ['Firefox'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
};