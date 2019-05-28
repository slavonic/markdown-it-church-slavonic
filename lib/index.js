'use strict';
var renderer = require('./renderer');

module.exports = function church_slavonic_plugin(md, options) {
  md.set({ xhtmlOut: true });

  if (options && options.renderer) {
    switch (options.renderer) {
      case 'xml':
        md.renderer = new renderer.XMLRenderer();
        break;
      case 'latex':
        md.renderer = new renderer.LaTeXRenderer();
        break;
      default:
        throw new Error('unknow renderer: ' + options.renderer);
    }
  }

  md.use(
    require('./redbukva')
  ).use(
    require('./verse')
  ).use(
    require('./pagebreak')
  ).use(
    require('./kinovar')
  );

};

module.exports.renderXML = function renderXML(md, src, env) {
  env = env || {};

  return (new renderer.XMLRenderer()).render(md.parse(src, env), md.options, env);
};

module.exports.renderLaTeX = function renderXML(md, src, env) {
  env = env || {};

  return (new renderer.LaTeXRenderer()).render(md.parse(src, env), md.options, env);
};
