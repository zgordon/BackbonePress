const  gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	eslint = require('gulp-eslint'),
	babel = require('gulp-babel'),
	connect = require('gulp-connect');


gulp.task('bundle', function() {
	return gulp.src('src/js/*/*.js')
		.pipe(babel({
		  presets: ['es2015']
		}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});

gulp.task('connect', function(){
	connect.server({
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', function(){
 	// 	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
 		gulp.run('bundle');
	});
});

gulp.task('default', ['connect', 'watch']);
