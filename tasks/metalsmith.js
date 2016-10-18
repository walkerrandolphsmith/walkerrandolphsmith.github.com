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
var gist         = require('metalsmith-gist');
var drafts       = require('metalsmith-drafts');
var pagination   = require('metalsmith-pagination');
var wordcount    = require("metalsmith-word-count");
var ignore       = require('metalsmith-ignore');
var Handlebars   = require('handlebars');
var excerpts     = require('metalsmith-excerpts');
var sitemap      = require('metalsmith-mapsite');
var robots       = require('metalsmith-robots');
var feed         = require('metalsmith-feed');

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

Handlebars.registerHelper('firstTag', function(tags) {
    return tags[0];
});

Handlebars.registerHelper('stripExcerpt', function( excerpt ) {
    return new Handlebars.SafeString(
        excerpt ? excerpt.replace('<p>', '').replace('</p>', '') : ''
    );
});

Handlebars.registerHelper('dropIndexHtml', function(url) {
    return url.replace('index.html', '');
});

Handlebars.registerHelper('authorbio', function(c) {
    console.log(c.site);
    console.log(c.authorbio);
    console.log(c.accounts);
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

var feedOpts = {
    collection: 'posts'
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
    reverse: true,
    yaml: { template: "tags.hbt" }
};

var templatesOpts = {
    engine: 'handlebars',
    directory: templatePath
};

var fullName = 'walkerrandolphsmith';

var metaData = {
    site_url: 'http://www.walkerrandolphsmith.com',
    site_name: fullName,
    site: {
        title: 'Walker Randolph Smith',
        url: 'http://www.walkerrandolphsmith.com',
        author: fullName
    },
    authorbio: {
        handle: fullName,
        email: 'walkerrandolphsmith@gmail.com',
        name: 'walker randolph smith',
        shortName: 'walker smith',
        shortDesc: ` Technology enthusiast, proud Eagle Scout, and software craftsman, I have a passion for the web and software development. I strive to adhere to Agile and SOLID principles while always maintaining a constant pursuit of improvement. My interests include UI/UX engineering, learning, and test driven development.`,
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

var sitemapOpts = {
    hostname: 'http://www.walkerrandolphsmith.com',
    omitIndex: true
};

var robotsOpts = {
    sitemap: 'http://www.walkerrandolphsmith.com/sitemap.xml'
};

var tags = function(opts) {
    return function (files, metalsmith, done) {
        meta = metalsmith.metadata();

        const tags = Object
            .keys(files)
            .reduce((array, key) => array.concat(
                Object.assign({}, files[key], { key: key})
            ), [])
            .filter(file => file.tags)
            .reduce((memo, file) => {
                const tags = file.tags
                    .split(',')
                    .filter(tag => tag !== ' ')
                    .filter(tag => !!tag)
                    .map(tag => tag.trim())
                    .map(tag => tag.toLowerCase());
                files[file.key].tags = tags;

                tags.forEach(tag => {
                    const key = `${opts.path}/${tag}/index.html`;
                    memo[key] = Object.assign({}, {tag: tag, posts: [], contents: ''}, memo[key], opts.yaml);
                    memo[key].posts = memo[key].posts.concat([file]);
                });
                return memo;
            }, {});

        files = Object.assign({}, files, tags);

        const tagsArray = Object
            .keys(tags)
            .reduce((array, key) => array.concat(
                Object.assign({}, { path: key }, tags[key])
            ), []);

        metalsmith.metadata().taglist = tagsArray
            .reduce((memo, tag) => memo.concat(
                Object.assign({}, tag, { count: tag.posts.length })
            ), [])
            .sort((curr, next) => curr.count < next.count);

        metalsmith.metadata().tags = tagsArray;

        done();
    };
};


gulp.task('metalsmith', function() {
    const markdownFilter = filter(file => /md/.test(file.path));

    return gulp
        .src('src/**')
        .pipe(markdownFilter)
        .pipe(frontMatter()).on('data', function(file) {
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
                .use(sitemap(sitemapOpts))
                .use(robots(robotsOpts))
                .use(feed(feedOpts))
                .use(templates(templatesOpts))
        )
        .pipe(gulp.dest('./build'));
});