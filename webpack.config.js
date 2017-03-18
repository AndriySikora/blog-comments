module.exports = {
    entry: './src/client',
    output: {
      path: __dirname + "/public",
      filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015']
                }
            }]
        },
            {
                test: /\.json$/,
                use: 'json'
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
};