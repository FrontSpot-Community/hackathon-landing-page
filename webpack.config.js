const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        entry: {
            main: ['./src/index.js', './src/styles.css']
        },
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.min.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['env']
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                }
            ]
        },
        plugins: [
            new UglifyJsPlugin(
                {
                    test: /\.js$/
                }
            )
        ]
    }
};