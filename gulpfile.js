// include gulp and required plugins
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');

// compile sass and check for errors
gulp.task('compile-sass', function () {
    return gulp.src('assets/sass/global.scss')
        .pipe(sass({ sourcemap: true, style: 'compressed'}))
        .on("error", notify.onError(function (error) {
            return "Dang! " + error.message;
        }))
        .pipe(gulp.dest('assets/css'));
});

// start browser-sync and watch for html, css and js changes
gulp.task('browser-sync', function() {  
    browserSync.init(["assets/css/*.css", "*.html", "assets/js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

// watch for changes
gulp.task('default', ['compile-sass', 'browser-sync'], function () {  
    gulp.watch("assets/sass/**/*.scss", ['compile-sass']);
});