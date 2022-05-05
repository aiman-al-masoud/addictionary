const path = require('path');

module.exports = {
    entry: './app/src/index.jsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module : {

    rules: [
        {
            test: /\.?jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }

    ]
}


}