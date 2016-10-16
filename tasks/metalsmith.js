var gulp         = require('gulp');
var gulpsmith    = require( 'gulpsmith');
var filter       = require('gulp-filter');
frontMatter      = require('gulp-front-matter');
assign           = require('lodash.assign');

var collections  = require('metalsmith-collections');
var markdown     = require('metalsmith-markdown');
var katex        = require('metalsmith-katex');
var templates    = require('metalsmith-templates');
var permalinks   = require('metalsmith-permalinks');
var tags         = require('metalsmith-tags');
var gist         = require('metalsmith-gist');
var drafts       = require('metalsmith-drafts');
var pagination   = require('metalsmith-pagination');
var wordcount    = require("metalsmith-word-count");
var ignore       = require('metalsmith-ignore');
var Handlebars   = require('handlebars');
var excerpts     = require('metalsmith-excerpts');

var fs           = require('fs');
var moment       = require('moment');


const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 3000;
const URL = `${PROTOCOL}://${HOST}:${PORT}`;
var baseUrl = URL;

Handlebars.registerPartial({
    'header': fs.readFileSync('./templates/partials/header.hbt').toString(),
    'footer': fs.readFileSync('./templates/partials/footer.hbt').toString(),
    'drawer': fs.readFileSync('./templates/partials/drawer.hbt').toString(),
    'navigation': fs.readFileSync('./templates/partials/navigation.hbt').toString(),
    'pagination': fs.readFileSync('./templates/partials/pagination.hbt').toString()
});

Handlebars.registerHelper('baseUrl', function() {
    return baseUrl;
});

Handlebars.registerHelper('dateFormat', function( context ) {
    return moment(context).format("LL");
});

Handlebars.registerHelper('dateGMT', function( context ) {
    context = context === 'new' ? new Date() : context;
    return context.toGMTString();
});

Handlebars.registerHelper('currentPage', function( current, page ) {
    return current === page ? 'current' : '';
});

Handlebars.registerHelper('stripExcerpt', function( excerpt ) {
    return excerpt.replace('<p>', '').replace('</p>', '');
});

Handlebars.registerHelper('tagList', function(context) {
    var tags = [];
    context.posts.forEach(post => {
        tags = tags.concat(post.tags);
    });

    var counts = {};

    for (var i = 0; i < tags.length; i++)
        counts[tags[i]] = (counts[tags[i]] + 1) || 1;

    return new Handlebars.SafeString(
        [...new Set(tags)]
            .map(tag => `<a href=${baseUrl}/tags/${tag}.html>${tag} (${counts[tag]})</a>`)
            .join('')
    )
});

var ignoreOpts = [
    '**/*.less',
    'app/**/*.*'
];

var collectionOpts = {
    posts: {
        pattern: 'posts/*.md',
        sortBy: 'date',
        reverse: true
    },
    pages: {
        pattern: 'pages/*.md'
    }
};

var permalinkOpts = {
    pattern: ':title',
    relative: false
};

var paginationOpts = {
    'collections.posts': {
        perPage: 2,
        template: 'indexWithPagination.hbt',
        first: 'index.html',
        path: ':num/index.html'
    }
};

var tagOpts = {
    handle: 'tags',
    template:'tags.hbt',
    path:'tags',
    sortBy: 'title',
    reverse: true
};

gulp.task('metalsmith', function() {
    const markdownFilter = filter(file => /md/.test(file.path));

    return gulp
        .src('src/**')
        .pipe(markdownFilter)
        .pipe(frontMatter()).on('data', function(file) {
            console.log(file.path);
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        //.pipe(markdownFilter.restore)
        .pipe(
            gulpsmith()
                .metadata({
                    site_name: 'walker site name'
                })
                .use(ignore(ignoreOpts))
                .use(drafts())
                .use(wordcount())
                .use(collections(collectionOpts))
                .use(katex())
                .use(markdown())
                .use(excerpts())
                .use(permalinks(permalinkOpts))
                .use(pagination(paginationOpts))
                .use(gist())
                .use(tags(tagOpts))
                .use(templates('handlebars'))
        )
        .pipe(gulp.dest('./build'));
});