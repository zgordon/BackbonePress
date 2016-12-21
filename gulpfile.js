var gulp   = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
    gulp.src('src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(requirejsOptimize(function(file) {
        return {
            optimize: 'uglify2',
            wrap: true,
            baseUrl: 'src/js/',
            include: ['app'],
            preserveLicenseComments: false
        };
    }))
    .pipe(rename('bundle.js'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['js', 'watch']);
