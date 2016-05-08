var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var path = require('path');

gulp.task('less', function() {
    return gulp.src('less/all.less')  // only compile the entry file
        .pipe(plumber({
              errorHandler: function (err) {
                console.log(err);
                this.emit('end');
              }
        }))
        .pipe(less({
          paths: ['less/']
        }))
        .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
        .pipe(gulp.dest('css/'))
        .pipe(livereload());
});
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['less']);  // Watch all the .less files, then run the less task

});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task