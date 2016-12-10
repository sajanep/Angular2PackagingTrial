/// <binding AfterBuild='cleanAndOptimize' Clean='cleanFiles' />
'use strict'

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var addsrc = require('gulp-add-src');
var del = require('del');
var addsrc = require('gulp-add-src');
var runSequence = require('run-sequence');
var sysBuilder = require('systemjs-builder');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var tscConfig = require('./tsconfig.json');

// See this article: http://caveofcode.com/2016/03/gulp-tasks-for-minification-and-concatenation-of-dependencies-in-angularjs/

//gulp.task('app-bundle', function () {
//    var tsProject = ts.createProject('tsconfig.json');

//    var tsResult = gulp.src([
//         'app/**/*.ts'
//    ]).pipe(tsProject());

//    return tsResult.js.pipe(addsrc.append('config-prod.js'))
//                      .pipe(concat('app.min.js'))
//                      .pipe(uglify())
//                      .pipe(gulp.dest('./dist'));
//});

gulp.task('compile:ts', function () {
    return gulp
      .src(['app/**/*.ts'])
      .pipe(plumber({
          errorHandler: function (err) {
              console.error('>>> [tsc] Typescript compilation failed'.bold.green);
              this.emit('end');
          }
      }))
      .pipe(sourcemaps.init())
      .pipe(tsc(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
});

// Generate systemjs-based builds
gulp.task('bundle:js', function () {
    var builder = new sysBuilder('', './systemjs.config.js');
    return builder.buildStatic('dist/main.js', 'dist/app.min.js')
      .then(function () {
          return del(['dist/**/*', '!dist/app.min.js', '!dist/vendors.min.js']);
      })
      .catch(function (err) {
          console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
      });
});

gulp.task('vendor-bundle', function () {
    gulp.src([
			'node_modules/core-js/client/shim.min.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/reflect-metadata/Reflect.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/rxjs/bundles/Rx.min.js'
    ])
		.pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('html-replace', function () {
    gulp.src('index.html')
      .pipe(htmlreplace({
          'vendor': 'vendors.min.js',
          'app': 'app.min.js'
      }))
      .pipe(gulp.dest('./dist'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
    return gulp.src(['app/**/*.css', 'app/**/*.html', 'styles.css', 'web.config', '!app/**/*.ts', '!app/**/*.js'], { base: './' })
      .pipe(gulp.dest('./dist'))
});


gulp.task('cleanFiles', function (done) {
    return del('./dist/**/*');
    //del(['./dist/*.min.js']).then(paths => {
    //    console.log('Deleted files and folders:\n', paths.join('\n'));
    //});
});

gulp.task('cleanAndOptimize', function () {
    runSequence(
        'cleanFiles',
        'vendor-bundle',
        'compile:ts',
        'bundle:js',
        'copy:assets',
        'html-replace'
    );
});