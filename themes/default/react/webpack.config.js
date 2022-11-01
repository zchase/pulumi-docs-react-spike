module.exports = {
    "mode": "development",
    "entry": {
        "index": "./js-temp/index.tsx"
    },
    "module": {
        "rules": [
            {
                "test": /\.(ts|js)x?$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            }
        ]
    },
    "resolve": {
        "extensions": [
            ".tsx",
            ".ts",
            ".js"
        ]
    },
    "output": {
        "path": "/Users/zackchase/go/src/github.com/zchase/pulumi-docs-react-spike/themes/default/assets",
        "filename": "[name].bundle.js"
    }
};
