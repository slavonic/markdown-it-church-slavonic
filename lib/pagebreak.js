'use strict';

var cuPagebreakPattern = new RegExp('^<<(\\d+)(?::\\s*([^>)]+))?>>');


function pagebreak_inline(state, silent) {
  var pos = state.pos,
      substring,
      match,
      token;

  // min size is 5 characters: "{{A}}"
  if (pos + 5 > state.posMax) {
    return false;
  }

  if (state.src.charCodeAt(pos) !== 0x3c /* < */) {
    return false;
  }

  if (state.src.charCodeAt(pos + 1) !== 0x3c /* { */) {
    return false;
  }

  substring = state.src.substring(pos);
  match = cuPagebreakPattern.exec(substring);
  if (!match) {
    return false;
  }

  if (!silent) {
    token = state.push('anchor', 'anchor', 0);
    token.attrs = [ [ 'number', match[1] ] ];
    if (match[2]) {
      token.attrs.push([ 'label', match[2] ]);
    }
  }

  state.pos += match[0].length;
  return true;
}

module.exports = function pagebreak_plugin(md) {
  md.inline.ruler.before('emphasis', 'pagebreak_inline', pagebreak_inline);
};
