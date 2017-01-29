// Include gulp and plugins
var gulp = require('gulp');
var assign = require('lodash.assign');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var gutil = require('gulp-util');
var removeCode = require('gulp-remove-code');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// add custom browserify options here
var customOpts = {
  entries: ['./app/js/main.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);

function bundle(bundler) {
  'use strict';
  return bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(removeCode({production: true}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

/**
 * Watch task (npm run dev)
 * Bundle, watch, and serve the app with browsersync
 */
gulp.task('watch', function () {
  var watcher = watchify(browserify(opts));
  bundle(watcher);
  watcher.on('update', function () {
    bundle(watcher);
  });
  watcher.on('log', gutil.log);

  browserSync.init({
    proxy: 'http://rmvwaittime.local/?town=Boston',
    serveStatic: ['.', './dist/js', './assets/'],
    logFileChanges: false
  });

  gulp.watch('./index.html').on('change', browserSync.reload);
});

/**
 * JS task (npm run build)
 * Bundle the js once
 */
gulp.task('js', function () {
  return bundle(browserify(opts));
});

gulp.task('default', ['watch']);
