const runSequence = require('run-sequence');
const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del');
const config = require('./config');

gulp.task('clean', function() {
    return del([
        config.dest
    ]);
});

gulp.task('cname', function() {
    return gulp
        .src(config.assets.cname)
        .pipe(gulp.dest(config.dest))
});

gulp.task('assets', function() {
    return gulp
        .src(config.assets.src)
        .pipe(gulp.dest(config.assets.dest))
});

gulp.task('scripts', shell.task([
    'webpack -p --config webpack.config.js'
]));

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'amp',
        ['metalsmith', 'scripts', 'styles', 'assets', 'cname'],
        'pdf',
        callback
    );
});
