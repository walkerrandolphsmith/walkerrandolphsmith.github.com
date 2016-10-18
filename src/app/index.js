import $ from 'jquery';
import jqueryCycle from 'jquery-cycle';
import chunck from 'lodash.chunk';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import katex from 'katex';
import GoogleAnalytics from './google-analytics';
import disqus from './disqus';

$(function() {
    drawer();
    backToTop();
    commentsStream();
    navigationScroller();
});

const drawer = () => {
    const $drawer = $('.drawer');

    $('.close').on('click', () => {
        $drawer.removeClass('show');
    });

    $('.open').on('click', () => {
        $drawer.addClass('show');
    });
};

const backToTop = () => {
    $('.back-to-top').on('click', () => {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
};

const commentsStream = () => {
    $('#comments').on('click', () => {
        $('.comment-steam').show();
        const current = $(document).scrollTop();
        const windowHeight = window.innerHeight;
        $('body,html').animate({ scrollTop: current + windowHeight }, 800);
    });
};

const navigationScroller = () => {
    var prev = 0;
    var $window = $(window);
    var $header = $($('header.blog-info')[0]);
    var lastScrollTop = 0;

    $window.on('scroll', function(){
        lastScrollTop = $window.scrollTop();
        if(lastScrollTop > 527) {
            $header.toggleClass('hidden', lastScrollTop > prev);
            prev = lastScrollTop;
        } else {
            $header.addClass('hidden');
        }
    });
};


request
    .get('https://api.github.com/users/walkerrandolphsmith/repos')
    .use(jsonp)
    .end((err, response) => {
        if (err || !response.body) return;
        let repos = [];
        if(response.body.data.message) {
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
