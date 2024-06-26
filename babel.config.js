/* eslint-disable no-undef */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
        [
            "@babel/preset-react",
            {
                runtime: "automatic", // this line enables the new JSX transform
            },
        ],
    ],
};
