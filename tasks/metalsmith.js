var gulp                = require('gulp');
var gulpsmith           = require('gulpsmith');
var filter              = require('gulp-filter');
var frontMatter         = require('gulp-front-matter');

var assign              = require('lodash.assign');
var handlebars          = require('./handlebars');

var collections         = require('metalsmith-collections');
var markdown            = require('metalsmith-markdown');
var katex               = require('metalsmith-katex');
var templates           = require('metalsmith-templates');
var permalinks          = require('metalsmith-permalinks');
var gist                = require('metalsmith-gist');
var drafts              = require('metalsmith-drafts');
var pagination          = require('metalsmith-pagination');
var wordcount           = require("metalsmith-word-count");
var ignore              = require('metalsmith-ignore');
var excerpts            = require('metalsmith-excerpts');
var sitemap             = require('metalsmith-mapsite');
var robots              = require('metalsmith-robots');
var feed                = require('metalsmith-feed');
var related             = require('metalsmith-static-related');
var redirect            = require('metalsmith-redirect');
var tags                = require('./plugins/tags');
var metaLogger          = require('./plugins/metaLogger');
var highlighter         = require('./plugins/highlighter');
var recentPosts         = require('./plugins/recentPosts');

var config              = require('./config');
var options             = config.metalsmith;

const metaData          = options.metaData;
const ignoreOpts        = options.ignore;
const collectionOpts    = options.collection;
const paginationOpts    = options.pagination;
const feedOpts          = options.feed;
const permalinkOpts     = options.permalink;
const tagOpts           = options.tags;
const relatedOpts       = options.related;
const templateOpts      = options.templates;
const sitemapOpts       = options.sitemap;
const robotsOpts        = options.robot;
const redirectOpts      = options.redirect;
const src               = options.src;
const dest              = options.dest;

gulp.task('metalsmith', function() {
    const markdownFilter = filter(file => /md/.test(file.path));

    return gulp
        .src(src)
        .pipe(markdownFilter)
        .pipe(frontMatter()).on('data', (file) => {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        .pipe(
            gulpsmith()
                .metadata(metaData)
                .use(ignore(ignoreOpts))
                .use(drafts())
                .use(collections(collectionOpts))
                .use(related(relatedOpts))
                .use(recentPosts())
                .use(katex())
                .use(markdown({
                    gfm: true,
                    smartypants: true,
                    renderer: highlighter.renderer,
                    langPrefix: 'language-',
                    highlight: highlighter.highlighter
                }))
                .use(excerpts())
                .use(permalinks(permalinkOpts))
                .use(pagination(paginationOpts))
                .use(gist())
                .use(tags(tagOpts))
                .use(wordcount())
                .use(redirect(redirectOpts))
                .use(sitemap(sitemapOpts))
                .use(robots(robotsOpts))
                .use(feed(feedOpts))
                .use(templates(templateOpts))
                .use(metaLogger(false))
        )
        .pipe(gulp.dest(dest));
});