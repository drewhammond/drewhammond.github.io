var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	minifycss = require('gulp-minify-css'),
	uncss = require('gulp-uncss'),
	rename = require('gulp-rename');

// Paths to assets
var paths = {
	'images': 'assets/img',
	'fonts' : 'assets/fonts',
	'sass'  : 'assets/sass',
	'css'   : 'assets/css',
	'js'    : 'assets/js'
};

gulp.task('watch', function () {
	console.log('Starting watch server');

	// Sass watch
	gulp.watch(paths.sass + '/**/*.scss', ['sass']);

	// HTML watch
	gulp.watch('index.html', ['html']);

	// JS watch
	gulp.watch(paths.js + '/**/*.js', ['js']);


});

gulp.task('html', function () {
	gulp.src('index.html')
		// Validate HTML5 against W3C validator
		// .pipe(w3cjs())
		.pipe(livereload());
});

gulp.task('sass', function (e) {
	return gulp.src(paths.sass + '/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			precision: 10,
			imgPath  : 'assets/img'
		}))
		.pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest(paths.css))
		.pipe(minifycss())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(paths.css))
		.pipe(livereload());
});

gulp.task('optimize', function () {
	return gulp.src(paths.css + '/main.css')
		.pipe(uncss({
			html: ['index.html']
		}))
		.pipe(gulp.dest(paths.css))
		.pipe(minifycss())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(paths.css))
})

//;gulp.task('sass', function () {
//    return gulp.src(paths.sass + '/**/*')
//        .pipe(sass({
//
//        }))
//        .pipe(autoprefixer('last 3 versions'))
//        .pipe(gulp.dest(paths.css))
//});

gulp.task('js', function () {
	console.log(paths.js);
});


// Task for development
gulp.task('dev', ['watch', 'sass', 'js'], function () {
	console.log('Dev task completed!');
});

// Task for production
gulp.task('prod', ['watch', 'sass', 'js', 'optimize'], function () {
	console.log('Dev task completed!');
});

gulp.task('default', ['dev'], function () {
	console.log('Task completed successfully');
});