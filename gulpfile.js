// adapt code and on top of Chart.js

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var insert = require('gulp-insert');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var uglify = require('uglify-js');
var minifier = require('gulp-uglify/minifier');
var collapse = require('bundle-collapser/plugin');
var package = require('./package.json');
var karma = require('gulp-karma');
var argv = require('yargs').argv;
var jsdoc = require('gulp-jsdoc3');
var babel = require('gulp-babel');
var rimraf = require('rimraf');

var srcDir = './src/';
var outDir = './dist/';

var header = "/*!\n" +
	" * Baidut.js\n" +
	" * https://wasin.io/\n" +
	" * Version: {{ version }}\n" +
	" *\n" +
	" * Copyright 2016 Wasin.io\n" +
	" * Released under the MIT license\n" +
	" * https://github.com/haxpor/baidut/blob/master/LICENSE.md\n" +
	" */\n";

var preTestFiles = [
];

var testFiles = [
	'./test/*.js'
];

/**
 * Tasks
 */
gulp.task('build', ['buildInitial'], buildCombinedTask);
gulp.task('buildInitial', buildInitialTask);
gulp.task('buildNormal', buildNormalTask);
gulp.task('buildMinified', buildMinifiedTask);
gulp.task('unittest', unittestTask);
gulp.task('unittestFull', unittestFullTask);
gulp.task('doc', docTask);
gulp.task('buildDev', ['buildInitial'], buildDevTask);
gulp.task('watch', watchTask);

function startTest() {
	return [].concat(preTestFiles).concat([
			'./src/**/*.js',
			'./test/mockContext.js'
		]).concat(
			argv.inputs?
			argv.inputs.split(';'):
			testFiles
		);
}

function watchTask() {
	var watcher = gulp.watch('./src/**/*.js', ['buildDev']);
	watcher.on('change', function(event)
  {
      console.log('File ' + event.path + ' was ' + event.type + ', run \'buildDev\' task');
  });
}

/**
 * Build dev build task
 * Dev build is non-minified, but babelified to ES2015.
 */
function buildDevTask() {
	// it will show error if pipe babel() to above
	return gulp.src('dist/Baidut-es6.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(streamify(concat('Baidut-dev-es5.js')))
		.pipe(gulp.dest(outDir));
}

function unittestTask() {
	return gulp.src(startTest())
		.pipe(karma({
			configFile: 'karma.conf.fast.js',
			action: 'run'
		}));
}

function unittestFullTask() {
	return gulp.src(startTest())
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}));
}

function buildInitialTask() {
	// build normal version
	return browserify('./src/baidut.js', { standalone: 'Baidut' })
		.plugin(collapse)
		.bundle()
		.pipe(source('Baidut-es6.js'))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(gulp.dest(outDir));
}

function buildCombinedTask() {
	buildNormalTask();
	buildMinifiedTask();
	buildDevTask();
}

function buildNormalTask() {
	// build minified version
	var options = {
		preserveComments: 'license'
	};

	// TODO: Whenever gulp-uglify support es6, then we update this to just chain (pipe) and use uglify directly from gulp-uglify
	// but for this instance we need to convert it to es2015 first before minify and uglify
	return gulp.src('dist/Baidut-es6.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(streamify(concat('Baidut.js')))
		.pipe(gulp.dest(outDir));
}

function buildMinifiedTask() {
	// build minified version
	var options = {
		preserveComments: 'license'
	};

	// TODO: Whenever gulp-uglify support es6, then we update this to just chain (pipe) and use uglify directly from gulp-uglify
	// but for this instance we need to convert it to es2015 first before minify and uglify
	return gulp.src('dist/Baidut-es6.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(minifier(options, uglify))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(streamify(concat('Baidut.min.js')))
		.pipe(gulp.dest(outDir));
}

function docTask(cb) {
	var config = require('./jsdocConfig.json');
	// delete docs folder first
	rimraf(config.opts.destination, function() {
		return gulp.src(['README.md', './src/**/*.js'], {read: false})
			.pipe(jsdoc(config));
  });
}
