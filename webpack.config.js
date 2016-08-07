const path = require('path');
const merge = require('webpack-merge');
const partsFactory = require('./webpack/libParts');
const multiConfig = require('./webpack/multiConfig')(partsFactory);

module.exports = (env = { prod: false, debug: false }) => {
    return multiConfig(__dirname, env, createConfig);
}

function createConfig(env, parts) {

    const common = merge(
        parts.excludeAngular(),
        parts.inlineHtmlTemplates(),
        parts.forEnvironment(),
        parts.typescript()
    );

    if (env.test) {
        return merge(
            parts.asTestBundle(),
            common
        );
    } else {
        return merge(
            parts.asUmdLibrary(),
            parts.extractSass([
                path.join(__dirname, 'src', 'styles', 'ng-table.scss')
            ]),
            common
        );
    }
}