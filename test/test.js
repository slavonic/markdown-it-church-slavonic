'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('assert');

var markdownit = require('markdown-it');
var generate = require('markdown-it-testgen');

var redbukva = require('../redbukva');
var verse = require('../verse');
var pagebreak = require('../pagebreak');


describe('markdown-it-church-slavonic', function () {
    var md;

    md = markdownit().use(redbukva);
    generate(path.join(__dirname, 'fixtures/redbukva.txt'), { header: true }, md);

    md = markdownit({xhtmlOut: true}).use(verse);
    generate(path.join(__dirname, 'fixtures/verse.txt'), { header: true }, md);

    md = markdownit({ xhtmlOut: true }).use(pagebreak);
    generate(path.join(__dirname, 'fixtures/pagebreak.txt'), { header: true }, md);
});
