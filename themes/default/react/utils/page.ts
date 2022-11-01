import React from "react";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";

const contentDirectory = "content";

export interface PageModule {
    default: React.FC;
    getStaticProps: () => Promise<void>;
}

interface BasePageData {
    title: string;
    meta_desc: string;
    markdown: string;
}

export type PageData<T> = BasePageData & T;

export function readPageContent<T>(contentPath: string): PageData<T> {
    const fullContentPath = path.join(process.cwd(), contentDirectory, contentPath);
    const contentString = fs.readFileSync(fullContentPath).toString();
    const contentParts = contentString.split("---");

    const pageData: PageData<T> = yaml.parse(contentParts[1]);
    pageData.markdown = contentParts[2];

    return pageData;
}

export function importPageModule(importPath: string): PageModule {
    const modulePath = path.join(process.cwd(), importPath);
    delete require.cache[require.resolve(modulePath)];
    return require(modulePath);
}
