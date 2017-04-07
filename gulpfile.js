var gulp = require('gulp');
var imgname = require('./index.js');


gulp.task('default', function() {
return gulp.src('./test/*.html')
  .pipe(imgname())
  .pipe(gulp.dest('./test/dist/'));
});



