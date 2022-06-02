// Cannot load "react-refresh/babel" in production
const plugins = [];
if (process.env.NODE_ENV !== "production") {
  plugins.push("react-refresh/babel");
}

module.exports = {
  // presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"],
  // plugins: ["@babel/plugin-proposal-class-properties"],

  presets: [
    "@babel/preset-env",
    "@babel/react",
    "@babel/typescript",
    // "@babel/preset-typescript",
    // [
    //   // Runtime automatic with React 17+ allows not importing React
    //   // in files only using JSX (no state or React methods)
    //   ("@babel/preset-react", { runtime: "automatic" }),
    // ],
  ],
  plugins: plugins,
};

// ["@babel/env", "@babel/typescript", "@babel/react"],
//   "plugins": [
//     "@babel/proposal-class-properties",
//     "@babel/proposal-object-rest-spread"
//   ]
