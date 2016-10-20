var gulp = require('gulp');
var rm = require( 'gulp-rm' );
var config = require('./config');

gulp.task('clean', function() {
    return gulp.src(`${config.dest}/**/*`, { read: false })
        .pipe(rm());
});