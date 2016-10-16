var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('scripts', shell.task([
    'webpack -p --config webpack.config.js'
]));