// Include gulp and plugins
var gulp    = require("gulp");
var webserver = require('gulp-webserver');

/**
* development task
* Default Task (run when you run 'gulp').
*/
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    })
  );
});
