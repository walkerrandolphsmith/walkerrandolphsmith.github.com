var pkg = require('./../package.json');

const src = './src';
const dest = './build';

const config = {
    port: 3000,
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
        globs: [
            `${src}/CNAME`,
            `${src}/googled7479385bda29208.html`
        ],
        dest: `${dest}/css`
    },
    blogPatterns: [
        `${src}/content/**/*.md`,
        `${src}/posts/*.md`,
        `${src}/templates/**/*.hbt`
    ]
};

module.exports = config;