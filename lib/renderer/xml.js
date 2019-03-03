'use strict';

var escapeHtml = require('./util').escapeHtml;
var assign = require('./util').assign;

var defaultRules = {};

defaultRules.text = function (tokens, i /*, options, env, renderer */) {
  return escapeHtml(tokens[i].content);
};

defaultRules.softbreak = function (/* tokens, i, options, env, renderer */) {
  return '\n';
};

function XMLRenderer() {
  if (!(this instanceof XMLRenderer)) {
    return new XMLRenderer(defaultRules);
  }

  this.rules = assign({}, defaultRules);
}

XMLRenderer.prototype.render = function (tokens, options, env) {
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
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result + '\n';
};

XMLRenderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};

XMLRenderer.prototype.renderToken = function (tokens, idx) {
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

XMLRenderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result;
};

module.exports = XMLRenderer;
