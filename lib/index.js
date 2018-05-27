'use strict';

module.exports = function church_slavonic_plugin(md) {
    md.set({ xhtmlOut: true });

    return md.use(
        require('./redbukva')
    ).use(
        require('./verse')
    ).use(
        require('./pagebreak')
    );
}