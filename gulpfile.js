var _ = gulp = require('gulp'),
        source = require('vinyl-source-stream'),
        connect = require('gulp-connect'),
        browserify = require('browserify');

gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./src/js/browser-main.js'],
    debug: true
  });
  return bundler.bundle()
    .pipe(source('./bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    host: '0.0.0.0',
    livereload: true,
  });
});

gulp.task('watch', function () {
   gulp.watch('src/**/*', ['index', 'browserify']);
});

gulp.task('default', ['connect', 'watch']);
