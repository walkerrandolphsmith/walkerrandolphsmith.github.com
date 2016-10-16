var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var LessAutoprefix = require('less-plugin-autoprefix');
var config = require("./config");

gulp.task('styles', () => {
    gulp.src(config.styles.src)
        .pipe(less({
            plugins: [
                new LessAutoprefix(config.autoprefixTarget)
            ]
        }))
        .pipe(rename(config.styles.name))
        .pipe(gulp.dest(config.styles.dest));
});