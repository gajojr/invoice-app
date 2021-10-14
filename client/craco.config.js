const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: { '@primary-color': '#1a8cff' },
                    javascriptEnabled: true,
                },
            },
        },
    }, ],
};