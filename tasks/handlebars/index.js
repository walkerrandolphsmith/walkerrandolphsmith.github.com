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
        navigation: fs.readFileSync(`${partialPath}/navigation.hbt`).toString(),
        pagination: fs.readFileSync(`${partialPath}/pagination.hbt`).toString()
    });

    Handlebars.registerHelper('baseUrl', () => URL);

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

    Handlebars.registerHelper('dropIndexHtml', url => url.replace('index.html', ''));
})();