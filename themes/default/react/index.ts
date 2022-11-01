import * as utils from "./utils";
import * as fs from "fs";
import * as path from "path";

async function main() {
    const page = utils.page.importPageModule("pages/react/index.tsx");
    const pageString = utils.render.renderPage(page.default, {});
    console.log(pageString);

    fs.writeFileSync(
        path.join(process.cwd(), "..", "layouts", "page", "react.html"),
        pageString,
    );

    await utils.hydration.createPageHydrationAsset("pages/react/index");
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.log(`Error: ${e}`);
        process.exit(1);
    });
