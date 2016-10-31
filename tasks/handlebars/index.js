const fs = require('fs');
const Handlebars = require('handlebars');
const moment = require('moment');
const config = require('./../config');

module.exports = (function(){

    const URL = config.url;
    const templatePath = config.metalsmith.templatePath;

    const partialPath = `${templatePath}/partials`;

    Handlebars.registerPartial({
        head: fs.readFileSync(`${partialPath}/head.hbt`).toString(),
        header: fs.readFileSync(`${partialPath}/header.hbt`).toString(),
        footer: fs.readFileSync(`${partialPath}/footer.hbt`).toString(),
        drawer: fs.readFileSync(`${partialPath}/drawer.hbt`).toString(),
        hero: fs.readFileSync(`${partialPath}/hero.hbt`).toString(),
        heroShort: fs.readFileSync(`${partialPath}/hero-short.hbt`).toString(),
        nav: fs.readFileSync(`${partialPath}/nav.hbt`).toString(),
        postNav: fs.readFileSync(`${partialPath}/nav-post.hbt`).toString(),
        pagination: fs.readFileSync(`${partialPath}/pagination.hbt`).toString()
    });

    Handlebars.registerHelper('baseUrl', () => URL);

    Handlebars.registerHelper('avatar', () => URL + '/css/images/logo.png');
    Handlebars.registerHelper('darkAvatar', () => URL + '/css/images/logo-dark.png');

    Handlebars.registerHelper('heroPath', hero => {
        const root = '/css/images/heroes';
        return hero ? `${root}/${hero}` : `${root}/default.jpg`;
    });

    Handlebars.registerHelper('dateFormat', context => moment(context).format("LL"));

    Handlebars.registerHelper('dateGMT', context => {
        context = context === 'new' ? new Date() : context;
        return context.toGMTString();
    });

    Handlebars.registerHelper('currentPage', (current, page) => current === page ? 'current' : '');

    Handlebars.registerHelper('firstTag', tags => tags[0]);

    Handlebars.registerHelper('stripExcerpt', excerpt => new Handlebars.SafeString(
        excerpt ? excerpt.replace('<p>', '').replace('</p>', '') : ''
    ));

    Handlebars.registerHelper('ampTitle', title => title.replace('-amp', ''));
    Handlebars.registerHelper('ampPath', title => title.replace('-amp', ''));

    Handlebars.registerHelper('dropIndexHtml', url => url.replace('index.html', ''));

    Handlebars.registerHelper('heroTitle', title => new Handlebars.SafeString(
        title
    ));

    Handlebars.registerHelper('mastery', level => {
        const dots = [];
        for(var i = 0; i < 5; i++) {
            dots.push(
                level <= i ? '<span class="level"></span>' : '<span class="level achieved"></span>'
            );
        }

        return new Handlebars.SafeString(
            `<div class="mastery">${dots.join('')}</div>`
        )
    });
})();