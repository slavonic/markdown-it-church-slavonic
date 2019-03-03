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
  );

};
