const metalsmith   = require('metalsmith');
const collections  = require('metalsmith-collections');
const markdown     = require('metalsmith-markdown');
const katex        = require('metalsmith-katex');
const templates    = require('metalsmith-templates');
const permalinks   = require('metalsmith-permalinks');
const tags         = require('metalsmith-tags');
const gist         = require('metalsmith-gist');
const drafts       = require('metalsmith-drafts');
const pagination   = require('metalsmith-pagination');
const wordcount    = require("metalsmith-word-count");
const less         = require('metalsmith-less');
const ignore       = require('metalsmith-ignore');
const icons        = require('metalsmith-icons');
const Handlebars   = require('handlebars');
const changed      = require('metalsmith-changed');
const livereload   = require('metalsmith-livereload');

const fs           = require('fs');
const http         = require('http');
const moment       = require('moment');
const nodeStatic   = require('node-static');
const watch        = require('glob-watcher');
const open         = require('open');


const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 8080;

const url = `${PROTOCOL}://${HOST}:${PORT}`;

const DIR = __dirname + "";
const baseUrl = url;

Handlebars.registerPartial({
  'header': fs.readFileSync('./templates/partials/header.hbt').toString(),
  'footer': fs.readFileSync('./templates/partials/footer.hbt').toString(),
  'navigation': fs.readFileSync('./templates/partials/navigation.hbt').toString()
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

const lessOpts = {
    pattern: '**/*.less',
    render: {
        paths: [
            './src/css'
        ]
    }
};

const ignoreOpts = [
    '**/*.less'
];

const collectionOpts = {
    posts: {
        pattern: 'posts/*.md',
        sortBy: 'date',
        reverse: true
    },
    pages: {
        pattern: 'content/pages/*.md'
    }
};

const permalinkOpts = {
    pattern: ':title',
    relative: false
};

const paginationOpts = {
    'collections.posts': {
        perPage: 2,
        template: 'indexWithPagination.hbt',
        first: 'index.html',
        path: ':num/index.html'
    }
};

const tagOpts = {
    handle: 'tags',
    template:'tags.hbt',
    path:'tags',
    sortBy: 'title',
    reverse: true
};

const iconOpts = {
    sets: { fa: 'fontawesome' },
    fontDir: 'fonts'
};

const build = (clean = false) => (done) => {
    var buildSite = metalsmith(DIR)
        .source('./src')
        .destination('./build')
        .use(changed())
        .use(drafts())
        .use(wordcount())
        .use(less(lessOpts))
        .use(ignore(ignoreOpts))
        .use(collections(collectionOpts))
        .use(katex())
        .use(markdown())
        .use(permalinks(permalinkOpts))
        .use(pagination(paginationOpts))
        .use(gist())
        .use(tags(tagOpts))
        //.use(icons(iconOpts))
        .use(templates('handlebars'));

    if (process.env.NODE_ENV !== 'production') {
        buildSite = buildSite
            .use(livereload({ debug: true }));
    }
    
    buildSite.build(function(err, files) {
        const filenames = Object.keys(files).join(', ');
        done(err);
    });
};



http.createServer((req, res) => {
    req.addListener('end', () => new nodeStatic.Server(DIR + '/build').serve(req, res));
    req.resume();
}).listen(PORT);


watch(
    `${DIR}/src/**/*`,
    { ignoreInitial: false },
    build(false)
);

watch(
    `${DIR}/templates/**/*`,
    { ignoreInitial: false },
    build(false)
);

open(url);