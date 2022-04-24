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
            "@videos": path.resolve(__dirname, 'src/assets/videos'),
            "@views": path.resolve(__dirname, 'src/views'),
            "@data-access": path.resolve(__dirname, 'src/data-access'),
            "@Context": path.resolve(__dirname, 'src/Context'),
            "@constants": path.resolve(__dirname, 'src/constants')
        }
    };

    return config;
}