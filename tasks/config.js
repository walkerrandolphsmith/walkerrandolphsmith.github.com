var pkg = require('./../package.json');

const src = './src';
const dest = './build';

const config = {
    port: 3000,
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
        dest: `${dest}/css`
    },
    blogPatterns: [
        `${src}/content/**/*.md`,
        `${src}/posts/*.md`,
        `templates/**/*.hbt`
    ]
};

module.exports = config;