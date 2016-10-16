var gulp = require('gulp');
var browserSync = require("browser-sync");
var config = require("./config");

gulp.task('dev', ['build'], function() {

    browserSync.init({
        server: "./build",
        port: config.port
    });

    config.blogPatterns.forEach(pattern => {
        gulp.watch(pattern, ['metalsmith']);
        gulp.watch(pattern).on('change', browserSync.reload);
    });

    gulp.watch(config.scripts.glob, ['scripts']);
    gulp.watch(config.scripts.glob).on('change', browserSync.reload);
    gulp.watch(config.styles.glob, ['styles']);
    gulp.watch(config.styles.glob).on('change', browserSync.reload);
});