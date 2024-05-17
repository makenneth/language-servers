var path = require('path')

const baseConfig = {
    mode: 'development',
    output: {
        path: __dirname,
        filename: 'out/[name].js',
        globalObject: 'this',
        library: {
            type: 'umd',
        },
    },
    experiments: {
        asyncWebAssembly: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
}

const nodeJsBundleConfig = {
    ...baseConfig,
    entry: {
        'aws-lsp-codewhisperer-binary': path.join(__dirname, 'src/index.ts'),
        fqnExtractorWorker: '@aws/lsp-fqn/out/node/fqnExtractorWorker.js',
    },
    resolve: {
        ...baseConfig.resolve,
        alias: {
            '@aws/fully-qualified-names$': '@aws/fully-qualified-names/node/aws_fully_qualified_names.js',
        },
    },
    target: 'node',
}

module.exports = [nodeJsBundleConfig]
