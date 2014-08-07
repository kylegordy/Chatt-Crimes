// include gulp and required plugins
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// compile sass and check for errors
gulp.task('compile-sass', function () {
    return gulp.src('assets/sass/global.scss')
        .pipe(sass({ sourcemap: true, style: 'compressed'}))
        .on("error", notify.onError(function (error) {
            return "Dang! " + error.message;
        }))
        .pipe(gulp.dest('assets/css'));
});

// lint js
gulp.task('lint-js', function() {
    return gulp.src('./assets/dev/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// concatenate & minify js
gulp.task('concat-js', function() {
    gulp.src(['./assets/js/lib/lodash.compat.min.js', './assets/js/lib/spin.min.js', './assets/js/dev/data.js', './assets/js/dev/map.js', './assets/js/dev/menu.js'])
        .pipe(concat('global.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/dist/'))
});

// start browser-sync and watch for html, css and js changes
gulp.task('browser-sync', function() {  
    browserSync.init(["assets/css/*.css", "*.html", "assets/js/dev/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

// watch for changes
gulp.task('default', ['compile-sass', 'lint-js', 'concat-js', 'browser-sync'], function () {  
    gulp.watch("assets/sass/**/*.scss", ['compile-sass']);
    gulp.watch("assets/js/dev/*.js", ['lint-js', 'concat-js']);
});