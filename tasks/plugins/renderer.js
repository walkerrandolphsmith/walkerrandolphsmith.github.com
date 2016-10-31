var marked = require('marked');

const renderer = new marked.Renderer();

renderer.code = function(code, lang, escaped) {
    code = this.options.highlight(code, lang);
    const langClass = !lang ? '' : ` class="${this.options.langPrefix + lang}"`;
    return `<div class="code-wrapper"><pre${langClass}><code${langClass}>${code}</code></pre><i class="fa fa-copy"></i></div>`
};

renderer.heading = function(text, level) {
    const t = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `<h${level}><a name="${t}" class="anchor" href="#${t}"></a>${text}</h${level}>`;
};

module.exports = renderer;