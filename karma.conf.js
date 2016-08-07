// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
const testGlob = 'test/*.ts';
const webpackConfig = require('./webpack.config')({ test: true })
module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // libraries
            'bower_components/lodash/lodash.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',

            // tests
            testGlob
        ],

        // generate js files from html templates
        preprocessors: {
            [testGlob]: ['webpack']
            // './dist/ng-table.js': ['coverage']
        },
        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true},
        reporters: ['progress', 'coverage'],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: 'out/coverage' },
                { type: 'json', dir: 'out/coverage' },
                { type: 'text-summary' }
            ]
        }
    });
};
