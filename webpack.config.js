const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        entry: {
            main: ['./src/js/index.js', './src/css/styles.css', './src/css/animate.css']
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