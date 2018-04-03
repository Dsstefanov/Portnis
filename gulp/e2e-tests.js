'use strict';

const runSequence = require('run-sequence');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const paths = gulp.paths;

gulp.task('webdriver-update', function(done) {
  return $.protractor.webdriver_update({browsers: ['ie', 'chrome', 'gecko']}, done);
});

gulp.task('webdriver-standalone', function(done) {
  return $.protractor.webdriver_standalone(done);
});

gulp.task('webdriver-start', function() {
  return runSequence('webdriver-update', 'webdriver-standalone');
});

function runProtractor(done) {
  gulp.src(paths.e2e + '/**/*.js')
      .pipe($.protractor.protractor({
        configFile: 'protractor.conf.js'
      }))
      .on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        console.log(err.stack || err.message);
        throw err;
      })
      .on('end', function() {
        // Close browser sync server
        browserSync.exit();
        done();
      });
}

gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e', 'protractor:run']);
gulp.task('protractor:dist', ['serve:e2e-dist', 'protractor:run']);
gulp.task('protractor:run', ['typescript:e2e'], runProtractor);
