// include gulp and required plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');

// compile sass and check for errors
gulp.task('compile-sass', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on("error", notify.onError(function (error) {
            return "Dang! " + error.message;
        }))
        .pipe(gulp.dest('assets/css'))
});

// start a server and watch for html and css changes
gulp.task('browser-sync', function() {  
    browserSync.init(["assets/css/*.css", "**/*.html"], {
        server: {
            baseDir: "./"
        }
    });
});

// watch for changes
gulp.task('default', ['compile-sass', 'browser-sync'], function () {  
    gulp.watch("assets/sass/**/*.scss", ['compile-sass']);
});