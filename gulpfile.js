/**
 * gulpfile.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
const gulp         = require('gulp');

const del          = require('del');
const yaml         = require('gulp-yaml');
const babel        = require('gulp-babel');
const eslint       = require('gulp-eslint');
const changed      = require('gulp-changed');
const sourcemaps   = require('gulp-sourcemaps');



/*!
 * Load plugin configuration files.
 */
const out          = 'lib';



/*!
 * Default build target.
 */
gulp.task('default', ['rebuild']);



/*!
 * Delete previous builds.
 */
const clean = () => del(`${out}/**`);
gulp.task('clean', clean);



/*!
 * Build javascript
 */
const jsBuild = () => gulp
  .src('src/**/*.js', { base: 'src' })
  .pipe(changed(out))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(out));
gulp.task('build:js', jsBuild);
gulp.task('build:js:re', ['clean'], jsBuild);



/*!
 * Build configuration files
 */
const ymlBuild = () => gulp
  .src('src/**/*.yml', { base: 'src' })
  .pipe(changed(`${out}`))
  .pipe(yaml())
  .pipe(gulp.dest(`${out}`));
gulp.task('build:yml', ymlBuild);
gulp.task('build:yml:re', ['clean'], ymlBuild);



/*!
 * Build misc JSON files
 */
const jsonBuild = () => gulp
  .src(['src/**/*.json'])
  .pipe(gulp.dest(`${out}`));
gulp.task('build:json', jsonBuild);
gulp.task('build:json:re', ['clean'], jsonBuild);



/*!
 * Incremental build (use with watch).
 */
gulp.task('build', [
  'build:js',
  'build:yml',
  'build:json'
]);
gulp.task('rebuild', [
  'build:js:re',
  'build:yml:re',
  'build:json:re'
]);



/*!
 * Automatically rebuild on save.
 */
const watch = () => {

  gulp.watch('src/**/*.js', ['build:js']);
  gulp.watch('src/**/*.yml', ['build:yml']);
  gulp.watch('src/**/*.json', ['build:json']);

};
gulp.task('watch', ['rebuild'], watch);
