var moment = require('moment');

module.exports = () => (files, metalsmith, done) => {

    var meta = metalsmith.metadata();

    const recentPosts = Object
        .keys(files)
        .reduce((array, key) => array.concat(
            Object.assign({}, files[key], { key: key})
        ), [])
        .filter(file => file.template === 'posts.hbt')
        .sort(function(a, b){
            a = a['date'];
            b = b['date'];
            if (!a && !b) return 0;
            if (!a) return -1;
            if (!b) return 1;
            if (b > a) return -1;
            if (a > b) return 1;
            return 0;
        })
        .reverse()
        .slice(0, 5)
        .map(post => Object.assign(
            post, { path: post.title.replace(/\s+/g, '-').toLowerCase() }
        ));

        metalsmith.metadata().recentPosts = recentPosts;

    done();
};
