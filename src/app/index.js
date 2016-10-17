import request from 'superagent';
import jsonp from 'superagent-jsonp';
import GoogleAnalytics from './google-analytics';
import $ from 'jquery';
import katex from 'katex';
import chunck from 'lodash.chunk';
import jqueryCycle from 'jquery-cycle';
import navigationScroll from './navigation-scroll';

GoogleAnalytics();

$(function() {
    var $drawer = $('.drawer');

    $('.close').on('click', function() {
        $drawer.removeClass('show');
    });

    $('.open').on('click', function() {
        $drawer.addClass('show');
    });

    $('.back-to-top').on('click', function() {
        console.log('i am clikced');
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
});


request
    .get('https://api.github.com/users/walkerrandolphsmith/repos')
    .use(jsonp)
    .end((err, response) => {
        if (err || !response.body) return;
        let repos = [];
        if(response.body.data.message) {
            //Rate limiting message
            repos = [
                {
                    name: 'yolo',
                    description: 'Andorid application',
                    url: 'http://github.com/walkerrandophsmith/yolo'
                },
                {
                    name: 'hush',
                    description: 'Andorid application',
                    url: 'http://github.com/walkerrandophsmith/hush'
                },
                {
                    name: 'VersionOne.Planr',
                    description: 'Andorid application',
                    url: 'http://github.com/walkerrandophsmith/VersionOne.Planr'
                }
            ]
        } else {
            repos = response.body.data.map(repo =>({
                name: repo.name,
                description: repo.description,
                url: repo.clone_url
            }));
        }
        cycle(repos, 'gh');
    });

request
    .get('https://api.bitbucket.org/1.0/users/walkerrandolphsmith')
    .use(jsonp)
    .end((err, response) => {
        if (err || !response.body) return;
        const repos = response.body.repositories.map(repo =>({
            name: repo.name,
            description: repo.description,
            url: 'http://bitbucket.org/walkerrandolphsmith/' + repo.name.replace(/\s+/g, '-').toLowerCase()
        }));
        cycle(repos, 'bb');
    });

request
    .get('http://jsfiddle.net/api/user/walkerrsmith/demo/list.json')
    .use(jsonp)
    .end((err, response) => {
        if (err || !response.body) return;
        const fiddles = response.body.list.map(fiddle =>({
            name: fiddle.title,
            description: fiddle.description,
            url: fiddle.url + fiddle.latest_version
        }));
        cycle(fiddles, 'jsf');
    });

const cycle = (repos, key) => {
    const listItems = repos.map(
        repo => `<li><h5 class="name"><a href="${repo.url}">${repo.name}</a></h5><p class="description">${repo.description}</p></li>`
    );

    const total = listItems.length;
    const groupSize = 2;
    const groups = chunck(listItems, groupSize);

    const $section = $(`#${key}-groups`);

    groups.forEach((group, i) => {
        const className = i === 0 ? ' active' : '';
        const $container = $(`<ul class="${key}-repos${className}"></ul>`);
        group.forEach(item => {
            $container.append($(item));
        });
        $section.append($container);
    });

    $section.cycle({
        fx:     'fade',
        prev:   `#${key}-prev`,
        next:   `#${key}-next`,
        timeout: 0,
        rev: true,
        delay: 100
    });
};
