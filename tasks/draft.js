const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const nopt = require('nopt');

const opts = {
    knownOpts: {
        "draft": String,
        "name": String,
        "tags": String
    },
    shortHands: {
        "d": ["--draft"],
        "n": ["--name"],
        "t": ["--tags"]
    }
};

const options = nopt(opts.knownOpts, opts.shortHands, process.argv, 2);

gulp.task('draft', [], function() {
    const isDraft = options.draft;
    const name = options.name;
    const tags = options.tags;


    const dir = path.resolve(__dirname, '../', 'src', 'posts/');

    if(!name) {
        console.log('No name was provided with -n or --name');
        return;
    }

    const fileName = `${dir}/${name}.md`;

    const newContents = getContent(name, isDraft, tags);

    fs.readFile(fileName, 'utf8', (err, contents) => {
        if(err) {
            console.log(`\nCreating a ${isDraft ? 'private' : 'public'} post at ${fileName}\n${newContents}`);
            fs.writeFile(fileName, newContents);
        } else {
            console.log('A post with that name already exists.');
        }
    })
});

const getContent = (name, isDraft, tags) => `---
title: ${name}
template: posts.hbt
date: ${Date.now()}
description: Post one
author: Walker Randolph Smith
type: article
public: ${isDraft ? 'false' : 'true'}
tags: ${tags.split(',').join(', ')}
hero: default.png
---
`;