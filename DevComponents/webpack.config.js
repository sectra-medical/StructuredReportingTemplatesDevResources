const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = config = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        library: 'SrtBasic',
        libraryTarget: 'umd'
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

            { test: /\.(svg|woff2?|ttf|eot)/, loader: "file-loader", options: { esModule: false } },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from:'./src/*.css', to: "[name].css"},
            { from: './src/Sectra-PX.*', to: "[name].[ext]" },
        ])
    ],
    performance: {
        hints: false
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    }
}
