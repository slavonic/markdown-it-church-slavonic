'use strict';

function make_tokenize(triggerChar) {
  return function tokenize(state, silent) {
    var scanned, token, len, ch,
        start = state.pos,
        marker = state.src.charCodeAt(start),
        triggerCode = triggerChar.charCodeAt(0);

    if (silent) { return false; }

    if (marker !== triggerCode) { return false; }

    scanned = state.scanDelims(state.pos, true);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len > 1) { return false; }

    token = state.push('text', '', 0);
    token.content = ch;

    state.delimiters.push({
      marker: marker,
      jump: 0,
      token: state.tokens.length - 1,
      level: state.level,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });

    state.pos += scanned.length;

    return true;
  };
}


function make_post_process(triggerChar, tag) {

  return function postProcess(state) {
    var i,
        startDelim,
        endDelim,
        token,
        delimiters = state.delimiters,
        max = state.delimiters.length,
        triggerCode = triggerChar.charCodeAt(0);

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== triggerCode) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      token = state.tokens[startDelim.token];
      token.type = tag + '_open';
      token.tag = tag;
      token.nesting = 1;
      token.markup = triggerChar;
      token.content = '';

      token = state.tokens[endDelim.token];
      token.type = tag + '_close';
      token.tag = tag;
      token.nesting = -1;
      token.markup = triggerChar;
      token.content = '';
    }
  };
}

module.exports = function kinovar_plugin(md) {

  md.inline.ruler.before('emphasis', 'kinovar', make_tokenize('='));
  md.inline.ruler2.before('emphasis', 'kinovar', make_post_process('=', 'kinovar'));

  md.inline.ruler.before('emphasis', 'wide', make_tokenize('+'));
  md.inline.ruler2.before('emphasis', 'wide', make_post_process('+', 'wide'));
};
