var prism = require('prismjs');
var marked = require('marked');

var extensions = {
    js: 'javascript',
    less: 'css',
    scss: 'css',
    sass: 'css',
    html: 'markdown',
    svg: 'markup',
    xml: 'markup',
    py: 'python',
    rb: 'ruby',
    ps1: 'powershell',
    psm1: 'powershell'
};

const renderer = new marked.Renderer();

renderer.code = function(code, lang, escaped) {
    code = this.options.highlight(code, lang);
    const langClass = !lang ? '' : ` class="${this.options.langPrefix + lang}"`;
    return `<pre${langClass}><code${langClass}>${code}</code></pre>\n`
};


const highlighter = (code, lang) => {
    if (!prism.languages.hasOwnProperty(lang)) {
        lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
};

module.exports = {
    highlighter: highlighter,
    renderer: renderer
};