import $ from 'jquery';
import jqueryCycle from 'jquery-cycle';
import jsPDF from 'jspdf';
import chunck from 'lodash.chunk';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import GoogleAnalytics from './google-analytics';

export default (() => {

    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));

    window.twttr.ready(
        twttr => twttr.events.bind('loaded', () => {
            const $timeline = $('iframe#twitter-widget-0')
                .contents()
                .find('.timeline-Widget');

            const $header = $timeline.find('.timeline-Header');
            $header.css({ display: 'none' });

            const $body = $timeline.find('.timeline-Body');
            $body.css({ border: 'none', width: '329px' });

            const $footer = $timeline.find('.timeline-Footer');
            $footer.css({ display: 'none' });
        })
    );

    $(function() {
        const $drawer = $('.drawer');

        $('.close').on('click', (event) => {
            $drawer.removeClass('show');
            event.stopPropagation();
        });

        $('.open').on('click', (event) => {
            $drawer.addClass('show');
            event.stopPropagation();
        });

        $(window).on('click', (event) => {
            const $target = $(event.target);
            const childOfDrawer = $target.parents('.drawer').length > 0;
            if(!childOfDrawer) {
                $drawer.removeClass('show');
            }
        });

        $(document).keyup((event) => {
            if(event.which === 27 /* escape */) {
                $drawer.removeClass('show');
            }
        });

        $('a').each(function() {
            var a = new RegExp(window.location.host);
            if(!a.test(this.href)) {
                $(this).click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(this.href, '_blank');
                });
            }
        });

        $('#print').on('click', () => {
            const mywindow = window.open('', 'resume', 'height=400,width=600');

            const resume = ($('<div/>').append($('#resume').clone()).html())

            const contents = `<html>
                <head>
                    <title>Resume</title>
                </head>
                <body>
                ${resume}
                </body>
            </html>`;

            mywindow.document.write(contents);
            mywindow.document.close();
            mywindow.focus();
            mywindow.print();
            mywindow.close();

            return true;
        });
    });

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
            repo => `<li><h5 class="name"><a href="${repo.url}" target="_blank">${repo.name}</a></h5><p class="description">${repo.description}</p></li>`
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
})()