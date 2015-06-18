var _ = gulp = require('gulp'),
        source = require('vinyl-source-stream'),
        browserify = require('browserify');

gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./src/js/browser-main.js'],
    debug: true
  });
  return bundler.bundle()
    .pipe(source('./bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});
