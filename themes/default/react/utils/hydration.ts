import * as fs from "fs";
import * as path from "path";
import webpack from "webpack";

function createPageHydrationString(fileImportPath: string): string {
    return `import React from "react";
import { createRoot } from "react-dom/client";
import Page from "${fileImportPath}";

const props = {};

const container = document.querySelector("main");
const root = createRoot(container!);
root.render(<Page {...props} />);`;
}

export async function createPageHydrationAsset(pagePath: string) {
    fs.mkdirSync("js-temp");

    const fileImportPath = path.join("..", pagePath);
    const hydrationString = createPageHydrationString(fileImportPath);
    fs.writeFileSync(path.join("js-temp", "index.tsx"), hydrationString);

    const entries = createWebpackEntries("js-temp");
    const config = createWebpackConfig(entries);

    const result = await runWebpack(config);

    fs.rmdirSync("js-temp", { recursive: true });
}

interface WebpackEntries {
    [key: string]: string;
}
function createWebpackEntries(currentPath: string, result: WebpackEntries = {}): WebpackEntries {
    const dir = fs.readdirSync(currentPath);

    for (let i = 0; i < dir.length; i++) {
        const item = dir[i];
        const key = item.split(".")[0];
        const newInputPath = path.join(currentPath, item);

        if (fs.lstatSync(newInputPath).isDirectory()) {
            createWebpackEntries(newInputPath, result);
            continue;
        }

        const entry = path.join(currentPath, item);
        result[key] = "./" + entry;
    }

    return result;
};

async function runWebpack(config: webpack.Configuration) {
    console.log(config);

    return new Promise((resolve, reject) => {
        webpack(config, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(undefined);
        });
    });
}

function createWebpackConfig(entries: WebpackEntries, mode: webpack.Configuration["mode"] = "development"): webpack.Configuration {
    return {
        mode,
        entry: entries,
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        output: {
            path: path.resolve(process.cwd(), "..", "static", "hydration"),
            filename: "[name].bundle.js",
        },
    };
}
