var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var input = './sass/style.scss';
var output = './';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  return gulp

    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch' ,'browser-sync']);