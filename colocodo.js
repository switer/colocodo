function lineIntent (lines) {
    var fmLines = [],
        intentMinLength;

    // get min intent
    lines.forEach(function (line, index) {
        if (!index && !line.trim()) return;
        var intents = line.match(/^\s*/)[0];
        if (intentMinLength == undefined || (intents.length < intentMinLength && line.trim()) ) {
            intentMinLength = intents.length;
        }
        fmLines.push(line);
    });
    intentMinLength = intentMinLength || 0;
    // replace intent and replace space of &nbsp;
    var regexp = new RegExp('^\\s{0,@}'.replace('@', intentMinLength), 'g');
    fmLines.forEach(function (line, index) {
        line = line.replace(regexp, '');
        var intents = line.match(/^\s*/)[0];
        intents = intents.replace(/\s/g, '&nbsp;');
        fmLines[index] = line.replace(/^\s*/, intents)

    });

    return fmLines;
}
function renderHTML (codeStr) {
    var code = codeStr.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;')
                    .replace(/(\s)([a-zA-Z\-]+)?\=/g, '$1<span class="attr">$2</span><span class="equal">=</span>')
                    .replace(/\=&quot;(.+?)&quot;/g, '=<span class="string">&quot;$1&quot;</span>')
                    .replace(/&lt;([a-zA-Z\-]+)?(\s)/g, '&lt;<span class="tagname">$1</span>$2')
                    .replace(/\/([a-zA-Z\-]+)?&gt;/g, '<span class="tagclose">/</span><span class="tagname">$1</span>&gt;')
                    .replace(/&lt;/g, '<span class="tag">&lt;</span>')
                    .replace(/&gt;/g, '<span class="tag">&gt;</span>')
                    // .replace(/\n/g, '<br />')

    var lines = code.split(/\n/);
    return lineIntent(lines).join('<br />');
}
function renderBash (codeStr) {
    var code = codeStr.replace(/\n(\s*)([a-zA-Z\-]+)/g, '\n$1<span class="sh">$2</span>');
    var lines = code.split(/\n/);
    return lineIntent(lines).join('<br />')
}
function renderCss (codeStr) {
    var code = codeStr.replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;')
                    .replace(/(&quot;|&apos;)(.*)?(&quot;|&apos;)/g, '<span class="cssString">$1$2$3</span>')
                    .replace(/(\n|\})(\s*)([^{}]+)(?=\{)/g, '$1$2<span class="selector">$3</span>')
                    .replace(/(\{|\;)(\s*)([a-zA-Z0-9]+)(?=\s*\:)/g, '$1$2<span class="property">$3</span>')

    var lines = code.split(/\n/);
    return lineIntent(lines).join('<br />')
}

function renderScript (codeStr) {
    var code = codeStr.replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;')
                    .replace(/([\+\-\*\/\^\~\!\%\|])/g, '<span class="operation">$1</span>')
                    .replace(/(&quot;|&apos;)(.*)?(&quot;|&apos;)/g, '<span class="scriptString">$1$2$3</span>')
                    .replace(/(\W)var(?![a-zA-Z0-9\_])/, '$1<span class="var">var</span>')
                    .replace(/(\W)function(?![a-zA-Z0-9\_])/, '$1<span class="function">function</span>')

    var lines = code.split(/\n/);
    return lineIntent(lines).join('<br />')
}

var code = renderHTML(document.querySelector('#tpl-html').innerHTML);
document.querySelector('#code').innerHTML = code;

var bashCode = renderBash(document.querySelector('#tpl-bash').innerHTML);
document.querySelector('#bashCode').innerHTML = bashCode;

var cssCode = renderCss(document.querySelector('#tpl-css').innerHTML);
document.querySelector('#cssCode').innerHTML = cssCode;

var scriptCode = renderScript(document.querySelector('#tpl-script').innerHTML);
document.querySelector('#scriptCode').innerHTML = scriptCode;

