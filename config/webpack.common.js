const path = require('path')
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
    mode:'development',
    devtool: 'inline-source-map',
    entry: resolveApp('src/index.ts'),
    module: {
        rules: [
            {
                parser: {
                    requireEnsure: false,
                },
                oneOf: [
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        exclude: /node_modules/,
                        loader: require.resolve('babel-loader'),
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            cacheDirectory: true,
                            cacheCompression: false,
                            sourceMaps: false,
                            inputSourceMap: false,
                        },
                    }
                ],
            },
        ],
    },
    resolve: {
        modules: [resolveApp('node_modules')],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        hot: true,
    }
}
