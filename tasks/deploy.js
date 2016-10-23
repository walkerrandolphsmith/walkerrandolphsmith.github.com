const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('deploy', ['build'], function() {
    shell.task([
        'git push origin `git subtree split --prefix build develop`:master --force'
    ]);
});
