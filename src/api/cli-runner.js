#!/usr/bin/env node
import CLI from "./cli";
import options from "./options";
const cli = new CLI();

(async () => {
    let args = process.argv.slice(process.argv[0].match(/node(\.exe)?$/g) ? 1 : 0);
    if (args[1] === "auth" && options.authenticate) {
        options.authenticate();
        return;
    }
    let resp = await cli.invoke(args);
    if (args[1] === "help") {
        console.log(resp);
        return;
    }
    if (resp.status != 201) {
        try {
            resp.headers.get("content-type");
        } catch (e) {
            console.log(JSON.stringify(resp, null, 2));
        }
    }
})();