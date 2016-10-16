var gulp = require('gulp');


gulp.task('cleanBuild', ['clean'], function() {
    
});

gulp.task('build', ['cleanBuild', 'metalsmith', 'scripts', 'styles'], function() {

});
