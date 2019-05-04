'use strict';

var path = require('path');
var markdownit = require('markdown-it');
var generate = require('markdown-it-testgen');

var plugin = require('..');


describe('markdown-it-church-slavonic', function () {
  var md = markdownit().use(plugin);

  generate(path.join(__dirname, 'fixtures/redbukva.txt'), { header: true }, md);
  generate(path.join(__dirname, 'fixtures/verse.txt'), { header: true }, md);
  generate(path.join(__dirname, 'fixtures/pagebreak.txt'), { header: true }, md);
  generate(path.join(__dirname, 'fixtures/emphasis.txt'), { header: true }, md);
});

describe('markdown-it-church-slavonic: XML renderer', function () {
  var md = markdownit().use(plugin, { renderer: 'xml' });

  generate(path.join(__dirname, 'fixtures/xml'), { header: true }, md);
});

describe('markdown-it-church-slavonic: LaTeX renderer', function () {
  var md = markdownit().use(plugin, { renderer: 'latex' });

  generate(path.join(__dirname, 'fixtures/latex'), { header: true }, md);
});
