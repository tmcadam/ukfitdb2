module.exports = {
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    },
    entry: './src-preload/preload.spin.ts',
    output: {
        filename: './src/assets/preload/preload.js'
    }
};
