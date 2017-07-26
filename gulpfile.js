var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var path = require('path');
var express = require('express');
var app = express();


//NODEMON
gulp.task('nodemon', function (cb) {
	var callbackCalled = false;
	return nodemon({script: './app.js'}).on('start', function () {
		if (!callbackCalled) {
			callbackCalled = true;
			cb();
		}
	});
});

//BROWSER SYNC
gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init({
		proxy: "http://localhost:5000"
	})
})

//STYLE COMPILER
gulp.task('compile-styles', function(){
	return gulp.src(path.join(__dirname, 'public', 'less', '*.less'))
				.pipe(concat('style.min.css'))
				.pipe(less().on('error', function (err) {
					console.log(err);
				}))
				.pipe(autoprefixer())
				.pipe(minifyCss().on('error', function (err) {
					console.log(err);
				}))
				.pipe(gulp.dest(path.join(__dirname, 'public', 'css')));
})

//WATCH
gulp.task('default', ['browser-sync'], function(){
	gulp.watch(path.join(__dirname, 'public', 'less', '*.less'), ['compile-styles', reload]);
	gulp.watch(path.join(__dirname, 'public', '**', '*.*'), reload);
})