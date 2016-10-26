var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util')
var pdf = require('html-pdf');
var through =require('through2');
var cheerio = require('cheerio');
var config = require('./config');

gulp.task('pdf', function() {
    var base = './build/css/blogr.css';
    gulp.src(config.resume.src)
        .pipe(convert({}))
        .pipe(gulp.dest(config.resume.dest))
});

var convert = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(null, file);
            return;
        }
        
        const fileContents = file.contents.toString();
        let $ = cheerio.load(fileContents);

        let resumeContents = $('#resume').html();

        const documentToPdf = `
        <html>
            <head>
                <title>Resume</title>
                <link rel="stylesheet" media="print" href="http://www.walkerrandolphsmith.com/css/blogr.css">
            </head>
            <body>
            <section id="resume">
                ${resumeContents}
            </section>
            </body>
        </html>
        `;

        pdf.create(documentToPdf, options)
            .toBuffer(function (err, buffer) {
                if (err) {
                    cb(null, file);
                    return;
                }

                file.contents = buffer;
                file.path =  gutil.replaceExtension(file.path, '.pdf');
                cb(null, file);
            });
    });
};
