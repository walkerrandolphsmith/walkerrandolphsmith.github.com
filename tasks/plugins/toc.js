const assign = require('lodash.assign');
var slug = require('slug');
var marked = require('marked');
var fs = require('fs');

let GLOBAL_FILE_NAME = '';
let currentHeadings = [];

const renderer = new marked.Renderer();

renderer.heading = function(text, level) {
    currentHeadings.push({
        title: GLOBAL_FILE_NAME.split(' ').join('-').toLowerCase(),
        text,
        slug: text.split(' ').join('-').toLowerCase()
    });
};

marked.setOptions({
    renderer: renderer
});

module.exports = function(opts) {
    const options = opts || {};
    options.selector = options.selector || 'h2, h3, h4, h5, h6';
    options.headerIdPrefix = options.headerIdPrefix || '';
    options.slug = options.slug

    return function (files, metalsmith, done) {
        const fileList = Object
            .keys(files)
            .filter(path => path.indexOf('amp') < 0)
            .filter(path => path.indexOf('posts') > 0)
            .map((path) => files[path]);

        fileList.forEach(file => {
            currentHeadings = [];
            GLOBAL_FILE_NAME = file.title;
            const markdownString = file.contents.toString('utf-8');
            marked(markdownString);
            assign(file, { toc: currentHeadings })
        });

        done();
    };
};