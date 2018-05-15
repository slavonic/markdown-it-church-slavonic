'use strict';
const Plugin = require('markdown-it-regexp');

const cuLetter = '(?:оу|Оу|ᲂу|\\S)[̀́̑̈҆̆̾꙽꙼̇̏҃҇ⷠⷡⷢⷣⷤⷥⷦⷧⷨⷩⷪⷫⷬⷭⷮⷯⷰⷱⷲⷳⷴⷵⷶⷷⷸⷹⷺⷻⷼⷽⷾⷿꙴꙵꙶꙷꙸꙹꙺꙻ꙼꙽҆҅]*';;
const cuRedBukvaPattern = new RegExp('~(' + cuLetter + ')', 'u');
const cuRedBukvitsaPattern = new RegExp('\\^(' + cuLetter + ')', 'u');
const cuPageBreakAnchorPattern = new RegExp('<<(\\d+)(?::\\s*([^>)]+))?>>', 'u');
const cuVerseLabelPattern = new RegExp('\\{\\{\\s*([^\\)]+)\\s*\\}\\}\\s*', 'u');


module.exports = function church_slavonic_plugin(md) {
    md.use(Plugin(cuRedBukvaPattern, function (match, utils) {
        return '<redbukva>' + utils.escape(match[1]) + '</redbukva>';
    })).use(Plugin(cuRedBukvitsaPattern, function(match, utils) {
        return '<bukvitsa>' + utils.escape(match[1]) + '</bukvitsa>';
    })).use(Plugin(cuVerseLabelPattern, function (match, utils) {
            return '<verse label="' + utils.escape(match[1]) + ' />';
    })).use(Plugin(cuPageBreakAnchorPattern, function (match, utils) {
            var number = match[1];
            var label = match[2];
            if (match[2] === undefined) {
                label = number;
            }
            return '<anchor number="' + utils.escape(number) + '" label="' + utils.escape(label) + '" />';
    }));
}