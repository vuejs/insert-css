var test = require('tape');
var insertCss = require('../');

var css = 'body { background-color: purple; color: yellow; }';

test(function (t) {
    t.plan(4);
    if (typeof window.getComputedStyle !== 'function') {
        t.fail('cannot getComputedStyle()');
    }
    
    var before = colors();
    t.ok(before.bg === 'rgba(0,0,0,0)' || before.bg === 'transparent');
    t.equal(before.fg, 'rgb(0,0,0)');
    
    insertCss(css);
    
    var after = colors();
    t.equal(after.bg, 'rgb(128,0,128)');
    t.equal(after.fg, 'rgb(255,255,0)');
});

function colors () {
    var style = window.getComputedStyle(document.body);
    return {
        bg: style.backgroundColor.replace(/\s+/g, ''),
        fg: style.color.replace(/\s+/g, '')
    };
}
