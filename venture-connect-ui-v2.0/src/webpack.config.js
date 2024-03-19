
var path = require("path");

module.exports = {
    mode: "development",
    entry: "../pages/_app.js",
    output: {
        filename: "index.js",
        path: path.resolve("dist/"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    "presets": ["@babel/preset-react"]
                }
            },
            {
                test: /\.html$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]"
                }
            },
            {
                test: /\.(png|jpg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // Inline images under 10KB
                    }
                },
                generator: {
                    filename: 'images/[name]-[hash][ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
};
