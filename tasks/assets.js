var gulp = require('gulp');
var config = require('./config');

gulp.task('cname', function() {
    return gulp.src(config.assets.cname).pipe(gulp.dest(config.dest))
});

gulp.task('assets', ['cname'], function() {
    return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dest))
});