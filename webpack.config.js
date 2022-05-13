let mode = "development";

if (process.env.NODE_ENV === "production"){
    mode="production"
};

module.exports = {
    mode: mode,

    devServer: {
        static: "./dist",
    },
    devtool: "source-map",
    // Babel setup
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};