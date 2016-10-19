var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var LessAutoprefix = require('less-plugin-autoprefix');
var cleanCSS = require('gulp-clean-css');
var config = require("./config");

gulp.task('styles', () => {
    gulp.src(config.styles.src)
        .pipe(less({
            plugins: [
                new LessAutoprefix(config.autoprefixTarget)
            ]
        }))
        .pipe(rename(config.styles.name))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(config.styles.dest));
});