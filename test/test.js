'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('assert');

var markdownit = require('markdown-it');
var generate = require('markdown-it-testgen');

var plugin = require('..');


describe('markdown-it-church-slavonic', function () {
    var md = markdownit().use(plugin);

    generate(path.join(__dirname, 'fixtures/redbukva.txt'), { header: true }, md);
    generate(path.join(__dirname, 'fixtures/verse.txt'), { header: true }, md);
    generate(path.join(__dirname, 'fixtures/pagebreak.txt'), { header: true }, md);
});
