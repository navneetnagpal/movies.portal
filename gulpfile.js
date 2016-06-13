'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    browserSync = require('browser-sync'),
    superstatic = require('superstatic'),
    eslint = require('gulp-eslint'),
    hub = require('gulp-hub'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    merge = require('merge-stream'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps');
var production = false;
var config = new Config();
var karma = require('karma').server;
var browserify = require('gulp-browserify');





/*
var browserify = require('browserify');
var _ = require('underscore');
var gutil = require('gulp-util');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var mkdirp = require('mkdirp');
var core = require('../../config').bundle().core;
var ngHtml2Js = require('browserify-ng-html2js');
var application = require('../../config').bundle().application;

function Scripts() {

}

function setOptions(options) {
    this.options = options;

    return this;
}

function defineTask(gulp) {
    var baseOptions = this.options;
    var bundler = _.memoize(function(bundlerOptions) {
        bundlerOptions = _.extend({
            debug: baseOptions.debug,
            entries: baseOptions.entries
        }, bundlerOptions);
        mkdirp.sync(bundlerOptions.dest);
        var defaults = {
            watch: false,
            debug: false
        };
        if (bundlerOptions.watch) {
            bundlerOptions = _.extend(defaults, bundlerOptions, watchify.args);
        }

        var b = browserify(bundlerOptions);
        if (baseOptions.core) {
            core.forEach(function(module) {
                b.require(module);
            });
        } else if (baseOptions.app) {
            b = b.require('APP').external(core);
        } else {
            b = b.add(bundlerOptions.src + '/main.js').external(core);
        }
        if (bundlerOptions.watch) {
            b = watchify(b);
        }
        return b;
    });
    var bundle = function(options) {
        var stream = bundler(options).transform(ngHtml2Js({
            module: 'templates', // optional module name
            extension: 'ngt', // optionally specify what file types to look for
            baseDir: 'src/app', // optionally specify base directory for filename
            stripPathBefore: '/templates', // optionally specify the part of the path that should be the starting point
            prefix: '', // optionally specify a prefix to be added to the filename,
            requireAngular: false // (default: false) optionally include `var angular = require('angular');` 
            // Supported in Angular 1.3.14 and above if you bundle angular with browserify
        })).bundle();

        stream = stream.on('error', gutil.log.bind(gutil, gutil.colors.red.bold('x error ' + options.bundleName)))
            .pipe(source(options.bundleName + '.js'))
            .pipe(buffer());

        return stream.pipe(gulp.dest(options.dest))
            .on('end', options.message);
    };
    gulp.task(this.getTaskName(), function() {
        bundle({
            debug: true,
            message: function() {
                gutil.log(gutil.colors.green.bold('☺ success on ' + baseOptions.bundleName + ':scripts'));
            },
            bundleName: baseOptions.bundleName,
            src: baseOptions.src,
            dest: baseOptions.dest,
            core: baseOptions.core
        })
    });
    if (baseOptions.watch) {
        gulp.task(this.getTaskName(true), function() {
            var _options = {
                watch: true,
                debug: true,
                message: function() {
                    gutil.log(gutil.colors.green.bold(' ** watching ' + baseOptions.bundleName + ':scripts'));
                },
                bundleName: baseOptions.bundleName,
                src: baseOptions.src,
                dest: baseOptions.dest,
                core: baseOptions.core
            };
            bundle(_options);
            bundler(_options).on('update', function() {
                bundle(_options);
            });
        })
    }
}
 

 */

var PATHS = {
    dest: './src/build/',
 
    karmaConfig: path.resolve(__dirname, './karma.conf.js'),

    styles: {
        main: './src/scss/main.scss',
        all: './src/**/*.scss'
    },

    scripts: {
        APP: './src/app/**/*.js'
    }    
};

gulp.task('clean', function(cb) {
    return del([
        path.join(PATHS.dest, '/*')        
    ], cb);
});
 
gulp.task('test', function() {
    console.log(__dirname);
    return karma.start({
        configFile: __dirname + '\\karma.conf.js'
    });
});

gulp.task('styles', function() {
    var stream = gulp.src(PATHS.styles.main);

    if (!production) {
        stream = stream.pipe(plumber())
            .pipe(sourcemaps.init({
                loadMaps: true
            }));
    }
    stream = stream.pipe(sass())
   
    if (!production) {
        stream = stream.pipe(sourcemaps.write('./', {
            includeContent: true,
            sourceRoot: './'
        }));
    }
    return stream.pipe(gulp.dest(path.join(PATHS.dest, '/css/')));
});


gulp.task('scripts', function() {
     
});

gulp.task('build',['styles','scripts']);


 

gulp.task('default', ['styles','scripts']);