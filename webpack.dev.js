const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: 'webvoxel.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Voxel',
        libraryTarget: 'var',
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
    externals: [
        'three',
    ],
};
