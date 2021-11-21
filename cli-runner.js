#!/usr/bin/env node
"use strict";

const CLI = require("./cli");
const options = require("./options");
const cli = new CLI();

(async () => {
    let args = process.argv.slice(process.argv[0].match(/node(\.exe)?$/g) ? 1 : 0);
    if (args[1] === "auth" && options.authenticate) {
        options.authenticate();
        return;
    }
    let resp = await cli.invoke(args);
    if (resp.status != 201) {
        console.log(resp);
    }
})();