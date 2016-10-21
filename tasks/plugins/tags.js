const assign = require('lodash.assign');

module.exports = function(opts) {
    return function (files, metalsmith, done) {
        meta = metalsmith.metadata();

        const tags = Object
            .keys(files)
            .reduce((array, key) => array.concat(
                Object.assign({}, files[key], { key: key})
            ), [])
            .filter(file => file.path.indexOf('amp') < 0)
            .filter(file => file.tags)
            .reduce((memo, file) => {
                const tags = file.tags
                    .split(',')
                    .filter(tag => tag !== ' ')
                    .filter(tag => !!tag)
                    .map(tag => tag.trim())
                    .map(tag => tag.toLowerCase());

                tags.forEach(tag => {
                    const key = `${opts.path}/${tag}/index.html`;
                    memo[key] = Object.assign({}, {
                        tag: tag, posts: [], contents: '',
                        title: tag,
                        type: 'website',
                        description: 'Articles related to ' + tag,
                        hero: `${tag}.png`,
                        path: `tags/${tag}`
                    }, memo[key], opts.yaml);
                    memo[key].posts = memo[key].posts.concat([file]);
                    assign(files[file.key], { tags });
                });
                return memo;
            }, {});

        assign(files, tags);

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