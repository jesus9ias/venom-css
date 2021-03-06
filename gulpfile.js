var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('compile', function(){
    return gulp.src('src/venom.styl')
    .pipe(stylus({use: nib()}))
    .pipe(gulp.dest('dist/venom'))
    .pipe(browserSync.stream());
});
gulp.task('compress', function(){
    return gulp.src('src/venom.styl')
    .pipe(stylus({use: nib()}))
    .pipe(minify())
    .pipe(rename('venom.min.css'))
    .pipe(gulp.dest('dist/venom/'))
    .pipe(browserSync.stream());
});
gulp.task('move', function(){
  gulp.src(['src/library/venom.js'])
  .pipe(gulp.dest('dist/js'));
});
gulp.task('serve', ['compile','compress'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("src/**/*.styl", ['compile','compress']);
    gulp.watch("src/**/*.js", ['move']);
    gulp.watch("index.html").on('change', browserSync.reload);
});
