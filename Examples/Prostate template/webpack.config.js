const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // All files with a '.css" will be handled by style-loader and css-loader.
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },

            // All files with a .ttf, .eot, .svh, .woff will be handled by file-loader.
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'}
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './*.html' },
            {from:'./*.css'},
			{from: './src/backplaneFunctions.js'}
        ])
    ],
    performance: {
        hints: false
    }
};