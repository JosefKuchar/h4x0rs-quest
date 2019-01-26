const path = require('path');

// Include plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/gwgc201819_overlay.png',
                to: 'gwgc201819_overlay.png'
            },
            {
                from: 'src/style.css',
                to: 'style.css'
            },
            {
                from: 'src/favicon.ico',
                to: 'favicon.ico'
            }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: true
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};