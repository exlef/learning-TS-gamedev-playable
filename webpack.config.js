const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    mode: 'production', // 'development' for debugging, 'production' for minified build
    entry: './src/index.ts', // Your "Main" file
    output: {
        path: path.resolve(__dirname, 'dist'), // The output folder
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Allows importing CSS files
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // We will create this next
            inject: 'body', // Inject script at the bottom of body
            minify: false // Keep it readable for now
        }),
        new HtmlInlineScriptPlugin(), // <--- THE MAGIC: Puts JS inside HTML
    ],
};