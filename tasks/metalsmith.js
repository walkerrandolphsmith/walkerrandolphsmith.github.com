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

const templatePath = './src/templates';
const partialPath = `${templatePath}/partials`;

Handlebars.registerPartial({
    header: fs.readFileSync(`${partialPath}/header.hbt`).toString(),
    footer: fs.readFileSync(`${partialPath}/footer.hbt`).toString(),
    drawer: fs.readFileSync(`${partialPath}/drawer.hbt`).toString(),
    navigation: fs.readFileSync(`${partialPath}/navigation.hbt`).toString(),
    pagination: fs.readFileSync(`${partialPath}/pagination.hbt`).toString()
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
    return new Handlebars.SafeString(
        excerpt.replace('<p>', '').replace('</p>', '')
    );
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

var templatesOpts = {
    engine: 'handlebars',
    directory: templatePath
};

var fullName = 'walkerrandolphsmith';

var metaData = {
    site_name: fullName,
    author: {
        handle: fullName,
        email: 'walkerrandolphsmith@gmail.com',
        name: 'walker randolph smith',
        shortName: 'walker smith',
        shortDesc: 'I am an author of this short description in metadata',
        longDesc: ''
    },
    accounts: {
        twitter: {
            handle: 'WalkerRSmith',
            url: 'twitter.com/'
        },
        linkedin: {
            handle: fullName,
            url: 'linkedin.com/'
        },
        stackOverflow: {
            handle: fullName,
            url: 'stackoverflow.com/'
        }
    }
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
                .metadata(metaData)
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
                .use(templates(templatesOpts))
        )
        .pipe(gulp.dest('./build'));
});