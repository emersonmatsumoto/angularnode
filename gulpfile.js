var gulp = require('gulp'); 

// Include Our Plugins
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var paths = {
  lib: ['./bower_components/angular/angular.js', './bower_components/angular-route/angular-route.js', './bower_components/angular-loading-bar/build/loading-bar.js'],
  scripts: ['./public/js/controllers/*.js', './public/js/myapp.js'],
  less: 'styles.less'
};

// Compiles LESS > CSS 
gulp.task('less', function(){
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('./public/css'));
});

// Minify CSS
gulp.task('minify', function () {
    gulp.src('./public/css/*.css')
        .pipe(minify({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public'))
    ;
});

// Concatenate & Minify libs JS
gulp.task('lib', function() {
    return gulp.src(paths.lib)
        .pipe(concat('lib-all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('lib-all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.lib, ['lib']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.less, ['less']);
});

// Default Task
gulp.task('default', ['watch', 'less', 'minify', 'scripts', 'lib']);