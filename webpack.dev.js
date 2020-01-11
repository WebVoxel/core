const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: 'webvoxel.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Voxel',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    externals: {
        three: {
            root: 'THREE',
            commonjs2: 'three',
            commonjs: 'three',
            amd: 'three',
        },
    },
};
