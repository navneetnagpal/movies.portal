var path = require('path');
var coverOptions = {
    ignore: ['**/*spec.js', '**/*.ngt'],
    defaultIgnore: true
};

var baseFiles = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'test/fixtures/**/*.js'
];
var rootSpecs = ['test/spec/*spec.js'];
var coreSpecs = ['test/spec/core/**/*spec.js'];
var commonSpecs = ['test/spec/common/**/*spec.js'];
var allSpecs = ['test/spec/components/**/*spec.js'];
var ngHtml2Js = require('browserify-ng-html2js');

// Karma configuration
// Generated on Mon Sep 29 2014 14:30:03 GMT+0530 (India Standard Time)

module.exports = function(config) {
    var cwd = process.cwd();
    var basePath = __dirname;
    if (basePath != cwd) {
        basePath = path.relative(cwd, __dirname) + '\\';
    }
    config.set({
        requiredFiles: baseFiles,
        preprocessors: {
            'src/app/**/*.js': ['coverage', 'browserify'],
            'src/common/**/*.js': ['coverage', 'browserify'],
            'test/spec/**/*spec.js': ['browserify']
        },

        browserify: createBrowserifyConfig({
            coverOptions: coverOptions
        }),
        // base path, that will be used to resolve files and exclude
        basePath: basePath,


        // frameworks to use
        frameworks: ['jasmine', 'browserify'],


        // list of files / patterns to load in the browser
        files: baseFiles.concat(
            rootSpecs,
            coreSpecs,
            commonSpecs,
            allSpecs),


        // list of files to exclude
        exclude: [

        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-browserify',
            'karma-coverage'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['mocha', 'coverage'],



        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        coverageReporter: {
            type: 'html',
            dir: 'test/coverage'
        },

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS' /*'Chrome' , 'Firefox', 'Safari', 'IE', 'PhantomJS'*/ ],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};

module.exports.createBrowserifyConfig = createBrowserifyConfig;

function createBrowserifyConfig(config) {
    var config = config || {};
    return {
        debug: true,
        extensions: ['.js'],
        transform: [
            ['browserify-ng-html2js', {
                module: 'templates', // optional module name
                extension: 'ngt', // optionally specify what file types to look for
                baseDir: 'src/app', // optionally specify base directory for filename
                stripPathBefore: '/templates', // optionally specify the part of the path that should be the starting point
                prefix: '', // optionally specify a prefix to be added to the filename,
                requireAngular: false // (default: false) optionally include `var angular = require('angular');` 
                // Supported in Angular 1.3.14 and above if you bundle angular with browserify
            }],
            ['browserify-istanbul', config.coverOptions || coverOptions]
        ],
        configure: function(bundle) {
            /*  bundle.on('prebundle', function() {
                bundle.require();
            });*/
        }
    }
}