var gulp = require('gulp'),
    webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/content/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-manifest', function() {
  return gulp.src('src/manifest.json')
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['webpack', 'copy-manifest']);
