const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = (env, argv) => {
    const styleLoader = argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;

    return {
        entry: [
            './app/main.js',
        ],
        output: {
            path: path.join(__dirname, 'assets'),
            filename: '[name].js',
            chunkFilename: '[chunkhash].js',
            publicPath: '/',
        },
        cache: true,
        bail: true,
        profile: true,
        parallelism: 1,
        watch: false,
        resolve: {
            alias: {
                modules: path.resolve(__dirname, 'app/modules/'),
                components: path.resolve(__dirname, 'app/components/'),
                assets: path.resolve(__dirname, 'app/assets/'),
                web: path.resolve(__dirname, 'app/web/'),
            },
            extensions: ['*', '.js', '.jsx']
        },
        optimization: {
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    },
                    vendors: {
                        filename: 'common.js'
                    }
                },
            }
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        module: {
            noParse: /node_modules\/dist/,
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            }, {
                test: /\.html$/,
                use: { loader: "html-loader" }
            }, {
                test: /\.(css|less)$/,
                use: [
                    styleLoader,
                    'css-loader',
                    'less-loader'
                ]
            }]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./dist/index.html",
                filename: "./index.html"
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            })
        ]
    }
};