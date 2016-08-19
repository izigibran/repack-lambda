var gulp = require('gulp'),
    zip = require('gulp-zip'),
    del = require('del'),
    runSequence = require('run-sequence'),
    lambda = require('node-aws-lambda'),
    rimraf = require('rimraf');

const zipped = `./tmp/${process.env.APP}.zip`;

//load release-it tasks
require('gulp-release-it')(gulp);

gulp.task('zip', () => {
    return gulp.src(`./dest/lambdas/${process.env.APP}/**/*`)
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
        ['zip'],
        ['upload'],
        callback
    );
});
