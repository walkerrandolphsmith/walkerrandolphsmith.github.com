import request from 'superagent';
import jsonp from 'superagent-jsonp';
import GoogleAnalytics from './google-analytics';
import $ from 'jquery';
import katex from 'katex';

GoogleAnalytics();

$(function() {
    var $drawer = $('.drawer');

    $('.close').on('click', function() {
        $drawer.removeClass('show');
    });

    $('.open').on('click', function() {
        $drawer.addClass('show');
    });
});

request
    .get('https://api.github.com/users/walkerrandolphsmith/repos')
    .use(jsonp)
    .end((err, response) => {
        if (err || !response.body) return;
        const repos = response.body.data.map(repo =>({
            name: repo.name,
            description: repo.description,
            url: repo.clone_url
        }));
        debugger;
    });

