var prism = require('prismjs');

var extensions = {
    js:     'javascript',
    less:   'css',
    scss:   'css',
    sass:   'css',
    html:   'markdown',
    svg:    'markup',
    xml:    'markup',
    py:     'python',
    rb:     'ruby',
    ps1:    'powershell',
    psm1:   'powershell'
};

const highlighter = (code, lang) => {
    if (!prism.languages.hasOwnProperty(lang)) {
        lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
};

module.exports = highlighter;