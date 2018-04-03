'use strict';

const gulp = require('gulp');

gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  diste2e: 'dist-e2e'
};

require('require-dir')('./gulp');

gulp.task('build', ['clean'], function() {
  gulp.start('e2e-tests');
});
