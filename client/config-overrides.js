const path = require("path");

module.exports = function override(config, env) {
    config.resolve = {
        ...config.resolve,
        alias: {
            "@src": path.resolve(__dirname, 'src'),
            "@components": path.resolve(__dirname, 'src/components'),
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@assets": path.resolve(__dirname, 'src/assets'),
            "@images": path.resolve(__dirname, 'src/assets/images'),
            "@views": path.resolve(__dirname, 'src/views'),
        }
    };

    return config;
}