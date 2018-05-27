'use strict';

var cuVersePattern = new RegExp('^\\{\\{\\s*([^\\}]+)\\s*\\}\\}\\s*');


function verse_inline(state, silent) {
    var pos = state.pos,
    substring,
    match,
    token;

    // min size is 5 characters: "{{A}}"
    if (pos + 5 > state.posMax) {
        return false;
    }

    if (state.src.charCodeAt(pos) != 0x7b /* { */) {
        return false
    }

    if (state.src.charCodeAt(pos + 1) != 0x7b /* { */) {
        return false
    }

    substring = state.src.substring(pos);
    match = cuVersePattern.exec(substring);
    if (!match) {
        return false;
    }

    if (!silent) {
        token = state.push('verse', 'verse', 0);
        token.attrs = [ ['label', match[1]] ];
    }

    state.pos += match[0].length;  // 1 for the leading tilda
    return true;
}

module.exports = function verse_plugin(md) {
    md.inline.ruler.before('emphasis', 'verse_inline', verse_inline);
}