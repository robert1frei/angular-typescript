'use strict';

var gulp = require('gulp');

var config = __dirname + '/karma.conf.js';
var karma = require('karma').server;
var runSequence = require('run-sequence');

gulp.task('karma-tdd', function (done) {
    return karma.start({
        configFile: config,
        coverageReporter: {
            type : 'html',
            dir : '../.tmp/coverage/'
        },
        browsers: ['Chrome']
    }, done);
});

gulp.task('karma-ci', function (done) {
    karma.start({
        configFile: config,
        coverageReporter: {
            type: 'lcov',
            subdir: 'lcov',
            dir: '../coverage/'
        },
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('karma-ci-short', function (done) {
    karma.start({
        configFile: config,
        coverageReporter: {type : 'text-summary'},
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('karma-coverage', function (done) {
    return karma.start({
        configFile: config,
        coverageReporter: {
            type : 'html',
            dir : '../.tmp/coverage/'
        },
        singleRun: true,
        autoWatch: false
    }, done);
});


gulp.task('coverage', function (done) {
    runSequence(
        'clean-tmp',
        'ts',
        'karma-coverage',
        done
    );
});