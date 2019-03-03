'use strict';
var cuLetter = '(?:оу|Оу|ᲂу|\\S)[̀́̑̈҆̆̾꙽꙼̇̏҃҇ⷠⷡⷢⷣⷤⷥⷦⷧⷨⷩⷪⷫⷬⷭⷮⷯⷰⷱⷲⷳⷴⷵⷶⷷⷸⷹⷺⷻⷼⷽⷾⷿꙴꙵꙶꙷꙸꙹꙺꙻ꙼꙽҆҅]*';
var cuRedBukvaPattern = new RegExp('^(?:' + cuLetter + ')');


function make_inline(triggerCharCode, tag) {

  return function (state, silent) {
    var pos = state.pos,
        substring,
        match,
        token;

    // min size is 2 characters: "~A"
    if (pos + 2 > state.posMax) {
      return false;
    }

    if (state.src.charCodeAt(pos) !== triggerCharCode) {
      return false;
    }

    // require space or start-of-the-line before redbukva
    if (
      pos > 0 &&
            state.src.charCodeAt(pos - 1) !== 0x20 &&
            state.src.charCodeAt(pos - 1) !== 0x0a
    ) {
      return false;
    }

    // require non-space after the trigger char
    if (state.src.charCodeAt(pos + 1) === 0x20) {
      return false;
    }

    substring = state.src.substring(pos + 1, pos + 5);
    match = cuRedBukvaPattern.exec(substring);
    if (!match) {
      return false;
    }

    if (!silent) {
      state.push(tag + '_open', tag, 1);
      token = state.push('text', '', 0);
      token.content = match;
      state.push(tag + '_close', tag, -1);
    }

    state.pos += 1 + match.length;  // 1 for the trigger symbol (e.g. tilda)
    return true;
  };
}

module.exports = function redbukva_plugin(md) {
  var redbukva_inline = make_inline(0x7e /* ~ */, 'redbukva');
  var bukvitsa_inline = make_inline(0x5e /* ^ */, 'bukvitsa');

  md.inline.ruler.before('emphasis', 'redbukva_inline', redbukva_inline);
  md.inline.ruler.before('emphasis', 'bukvitsa_inline', bukvitsa_inline);
};
