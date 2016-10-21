var pkg = require('./../package.json');

const src = './src';
const dest = './build';


const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 3000;
const URL = `${PROTOCOL}://${HOST}:${PORT}`;

const DOMAIN = `http://www.walkerrandolphsmith.com`;

const tempaltePath = `${src}/templates`;

var handle = 'walkerrandolphsmith';
var fullName = 'Walker Randolph Smith';
var defaultDescription = 'Technology enthusiast, proud Eagle Scout, and software craftsman, I have a passion for the web and software development. I strive to adhere to Agile and SOLID principles while always maintaining a constant pursuit of improvement. My interests include UI/UX engineering, learning, and test driven development.'
var ogType = 'website';

const config = {
    port: PORT,
    url: URL,
    src: src,
    dest: dest,
    styles: {
        src: `${src}/css/index.less`,
        glob: `${src}/css/**/*.less`,
        autoprefixTarget: {
            browsers: [
                'last 2 versions'
            ]
        },
        dest: `${dest}/css`,
        name: `${pkg.name}.css`
    },
    scripts: {
        src: `${src}/app/index.js`,
        glob: `${src}/app/**/*.js`
    },
    assets: {
        src: `${src}/css/{fonts,images}/**/*.*`,
        cname: `${src}/{CNAME,googled7479385bda29208.html}`,
        dest: `${dest}/css`
    },
    blogPatterns: [
        `${src}/content/**/*.md`,
        `${src}/posts/*.md`,
        `${src}/templates/**/*.hbt`
    ],
    metalsmith: {
        src: `${src}/**/*.*`,
        dest: dest,
        metaData: {
            site_url: DOMAIN,
            site_name: fullName,
            site: {
                title: fullName,
                hometitle: 'Musings of a sotfware developer',
                url: DOMAIN,
                author: fullName
            },
            authorbio: {
                handle: fullName,
                email: `${handle}@gmail.com`,
                name: fullName,
                shortName: 'Walker Smith',
                shortDesc: defaultDescription,
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
        },
        ignore: [
            '**/*.less',
            '**/*.js'
        ],
        amp: {
            src: `${src}/content/amps`
        },
        collection: {
            posts: {
                pattern: 'content/posts/*.md',
                sortBy: 'date',
                reverse: true
            },
            pages: {
                pattern: 'content/pages/*.md'
            },
            amp: {
                pattern: 'content/amp/*.md'
            }
        },
        pagination: {
            'collections.posts': {
                perPage: 2,
                template: 'indexWithPagination.hbt',
                first: 'index.html',
                path: 'posts/:num/index.html',
                pageMetadata: {
                    description: defaultDescription,
                    type: ogType,
                    hero: 'default.png'
                }
            }
        },
        feed: {
            collection: 'posts'
        },
        permalink: {
            pattern: ':title',
            relative: false
        },
        tags: {
            handle: 'tags',
            path:'tags',
            sortBy: 'title',
            reverse: true,
            yaml: { template: "tags.hbt" }
        },
        templatePath: tempaltePath,
        templates: {
            engine: 'handlebars',
            directory: tempaltePath
        },
        sitemap: {
            hostname: DOMAIN,
            omitIndex: true
        },
        robot: {
            sitemap: `${DOMAIN}/sitemap.xml`
        }
        
    }
};

module.exports = config;