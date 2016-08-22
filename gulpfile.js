var gulp = require('gulp'),
  zip = require('gulp-zip'),
  del = require('del'),
  install = require('gulp-install'),
  runSequence = require('run-sequence'),
  lambda = require('node-aws-lambda'),
  rimraf = require('rimraf');

const zipped = `./tmp/${process.env.APP}.zip`;

//load release-it tasks
require('gulp-release-it')(gulp);

gulp.task('modules', _ => {
  return gulp.src('./package.json')
    .pipe(gulp.dest(`dist/lambdas/${process.env.APP}`))
    .pipe(install({ production: true }));
});

gulp.task('zip', _ => {
  return gulp.src(`./dist/lambdas/${process.env.APP}/**/*`)
    .pipe(zip(`${process.env.APP}.zip`))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('upload', (callback) => {
  lambda.deploy(
    zipped,
    require(`./config/${process.env.APP}.config.js`),
    callback
  );
});

gulp.task('deploy', (callback) => {
  return runSequence(
    ['modules'],
    ['zip'],
    ['upload'],
    callback
  );
});
