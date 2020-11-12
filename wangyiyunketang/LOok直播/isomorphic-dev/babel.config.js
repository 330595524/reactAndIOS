const isWebTarget = (caller) => caller && caller.target === 'web';
module.exports = function (api) {
    const isweb = api.caller(isWebTarget);
    const config = {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "modules": false,
                    "useBuiltIns": isweb ? "usage" : undefined,
                    "targets": isweb ? {
                        browsers: [
                            "edge >= 17",
                            "firefox >= 60",
                            "chrome >= 67"
                        ]
                    } : { node: 'current' },
                    "corejs": isweb ? {
                        "version": 3,
                        "proposals": true,
                    } : false,
                    "debug": false
                },
            ],
            "@babel/preset-react"
        ],
        "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            "@loadable/babel-plugin",
            "react-hot-loader/babel"
        ]
    }
    return config;
}