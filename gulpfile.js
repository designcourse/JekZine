var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var uncss = require('gulp-uncss');
var minifycss = require('gulp-minify-css');

gulp.task('build', shell.task(['jekyll build --watch']));


gulp.task('serve', function () {

	browserSync.init({server: {baseDir: '_site/'}});

	gulp.watch('_site/**/*.*').on('change', browserSync.reload);

});


gulp.task('default', ['build','serve']);


gulp.task('post', function() {
	return gulp.src('_site/css/main.css')

	.pipe(uncss({
		html: ['index.html','posts/**/*.html','_includes/*.html','_layouts/*.html']
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('_site/css/'))
});