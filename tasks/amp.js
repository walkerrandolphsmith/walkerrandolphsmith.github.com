const gulp = require('gulp');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const change = require('gulp-change');

const config = require('./config');

gulp.task('cleanAmp', function() {
    return gulp
        .src(config.metalsmith.amp.src, { read: false })
        .pipe(clean());
});

gulp.task('amp', ['cleanAmp'], function() {

    const changeBy = (content) => {
        let contents = content
            .replace(
                /template: posts.hbt/g,
                'template: amp-posts.hbt'
            );
        const matches = contents.match(/title: (?:.*)\n/);
        if(matches) {
            const oldTitle = matches[0];
            const oldTitlePortion = oldTitle.split('\n')[0];
            contents = contents.replace(oldTitlePortion, oldTitlePortion + "-amp")
        }

        return contents;
    };

    return gulp
        .src('src/content/posts/**')
        .pipe(filter(file => /md/.test(file.path)))
        .pipe(change(changeBy))
        .pipe(rename((path) => {
            path.basename += '-amp';
            path.basename = path.basename.replace(/-/g, '');
            path.extname = '.md';
        }))
        .pipe(gulp.dest(config.metalsmith.amp.src));
});