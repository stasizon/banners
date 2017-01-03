const gulp = require('gulp');
const less = require('gulp-less');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const path = require('path');
const data = require('gulp-data');
const include = require('gulp-include');
const flatten = require('gulp-flatten');
const rename = require("gulp-rename");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// --------------------------------------------------------------

gulp.task('clean', function() {
    return del('app');
});


gulp.task('html', function() {

    return gulp.src('assets/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('app/'));

});


gulp.task('styles', function() {

    return gulp.src('assets/index.less')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .on('error', notify.onError(function(err) {
            return {
                title: 'Less crash',
                message: err.message
            }
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('app/'));

});


gulp.task('js', function() {
    return gulp.src('assets/index.js')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(include())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('app/'));
});


gulp.task('img', function() {
    return gulp.src('assets/blocks/**/img/*.+(png|jpg|svg)', {
            base: 'assets/blocks/**',
            since: gulp.lastRun('img')
        })
        .pipe(flatten())
        .pipe(gulp.dest('app/img/'));
});


gulp.task('assets', function() {
    return gulp.src(['assets/libs/**', 'assets/fonts/**/*'], {
            base: 'assets',
            since: gulp.lastRun('assets')
        })
        .pipe(gulp.dest('app/'));
});

// --------------------------------------------------------------

gulp.task('serve', function() {
    browserSync.init({
        server: 'app'
    });

    browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch(['assets/blocks/**/*.pug', 'assets/index.pug'], gulp.series('html'));
    gulp.watch(['assets/blocks/**/*.less', 'assets/index.less', 'assets/media.less'], gulp.series('styles'));
    gulp.watch(['assets/blocks/**/*.js', 'assets/index.js'], gulp.series('js'));
    gulp.watch('assets/blocks/**/img/*.(png|jpg)', gulp.series('img'));
    gulp.watch('assets/libs/**/*.*', gulp.series('assets'));
    gulp.watch('assets/fonts/*.*', gulp.series('assets'));
});

gulp.task('build', gulp.series('clean', 'html', 'styles', 'js', 'img', 'assets'));

gulp.task('dev', gulp.series('build', gulp.parallel(['watch', 'serve'])));

gulp.task('default', gulp.series('dev'));
