'use strict';

var escapeLaTeX = require('./util').escapeLaTeX;
var assign = require('./util').assign;

var defaultRules = {};

defaultRules.em_open = function (/*tokens, i, options, env*/) {
  return '\n\n';
};

defaultRules.em_close = function (/*tokens, i, options, env*/) {
  return '\n\n';
};

defaultRules.paragraph_open = function (/*tokens, i, options, env*/) {
  return '\n\n';
};

defaultRules.paragraph_close = function (/*tokens, i, options, env*/) {
  return '';  
};

defaultRules.softbreak = function (/*tokens, i, options, env*/) {
  return '\n';
};

defaultRules.text = function (tokens, i/*, options, env*/) {
  return escapeLaTeX(tokens[i].content);
};

defaultRules.anchor = function (tokens, i/*, options, env*/) {
  var token = tokens[i];
  var j;

  var x = {};
  for (j = 0; j < token.attrs.length; j++) {
    x[token.attrs[j][0]] = token.attrs[j][1];
  }

  var anchor = '\\anchor{' + x.number;
  if (x.label) {
    anchor += ',' + x.label;
  }

  return anchor + '}';
};

defaultRules.redbukva_open = function () {
  return '\\cuKinovar{';
};

defaultRules.redbukva_close = function () {
  return '}';
};

defaultRules.bukvitsa_open = function () {
  return '\\cuDropcaps{';
};

defaultRules.bukvitsa_close = function () {
  return '}';
};

defaultRules.verse = function () {
  return '\\cuVerse{???}';
};
defaultRules.verse = function (tokens, i/*, options, env*/) {
  var token = tokens[i];
  var j;

  var x = {};
  for (j = 0; j < token.attrs.length; j++) {
    x[token.attrs[j][0]] = token.attrs[j][1];
  }

  return '\\cuVerse{' + x.label + '}';
};

function LaTeXRenderer() {
  if (!(this instanceof LaTeXRenderer)) {
    return new LaTeXRenderer(defaultRules);
  }

  this.rules = assign({}, defaultRules);
}

LaTeXRenderer.prototype.render = function (tokens, options, env) {
  var type, rule, i;
  var result = '';

  for (i = 0; i < tokens.length; i++) {
    type = tokens[i].type;
    rule = this.rules[type];

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rule !== 'undefined') {
      result += rule(tokens, i, options, env, this);
    } else {
      throw new Error('do not know how to render token of type: ' + type);
    }
  }

  return result.trim() + '\n';
};

LaTeXRenderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      throw new Error('do not know how to render inline token of type: ' + type);
    }
  }

  return result;
};

LaTeXRenderer.prototype.renderToken = function (tokens, idx) {
  var token = tokens[idx];

  if (token.hidden) {
    return '';
  }

  if (token.nesting === 1) {
    return '<' + token.tag + this.renderAttrs(token) + '>';
  } else if (token.nesting === 0) {
    return '<' + token.tag + this.renderAttrs(token) + ' />';
  }
  return '</' + token.tag + '>';

};

LaTeXRenderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeLaTeX(token.attrs[i][0]) + '="' + escapeLaTeX(token.attrs[i][1]) + '"';
  }

  return result;
};

module.exports = LaTeXRenderer;
