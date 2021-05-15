// const HtmlWepackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: "./src/engine/index.js",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
        ]
    },
    output: {
        filename: 'engineBundle.js',
        path: path.join(__dirname, "public", "scripts"),
    },

    // plugins: [
    //     new HtmlWepackPlugin({
    //         template: (__dirname, "public", "views", "engine.html"),
    //         filename: path.join(__dirname, "public", "views", "./engine.html")
    //     })
    // ]
};