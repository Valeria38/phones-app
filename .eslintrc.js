module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "es6": true
    },
    "rules": {
        "no-plusplus": 0,
        "template-curly-spacing":["error", "always"],
        "no-underscore-dangle":[0, {"allowAfterThis": false}],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};