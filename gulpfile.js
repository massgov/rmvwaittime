// Include gulp and plugins
var gulp    = require("gulp");
var webserver = require("gulp-webserver");
var removeCode = require("gulp-remove-code");

/**
* development task
* Default Task (run when you run 'gulp').
*/

gulp.task('strip-js', function() {
  gulp.src('./app/js/modules/rmvWaitTime.js')
    .pipe(removeCode({ production: true }))
    .pipe(gulp.dest('./app/js/modules/clean'));
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    })
  );
});
