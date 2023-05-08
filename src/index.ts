#!/usr/bin/env node

import { provideInfo } from "./apiController.js";
import { loginPrompt } from "./login.js";
import { useApi, me, getApiFunctions } from "./utils.js";

const commands = {
    "test-online-connection": async () => {
        try {
            const [api] = useApi();
            let resp = await api.Index();
            if (resp.status < 200 || resp.status > 399) {
                throw new Error("Status code = " + resp.status);
            }
            console.log("Success!");
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    },
    "ls": async args => {
        console.log('args',args)
        if (args.length != 2) {
            console.log('Usage: `sova-cli ls \n\nReturns list of possible commands to run with sova-cli run `');
            return;
        }
        const choices = getApiFunctions()
        console.log('Available options:\n\t', choices.join('\n\t') )
    },
    'login': async args => {
        if (args.length != 2) {
            console.log('Usage: `sova-cli login`');
            return;
        }
        await loginPrompt();
    },
    'info': async args => {
        if (args.length != 3) {
            console.log('Usage: `sova-cli info [endpointName]\n\nReturns information about parameters needed for given command`');
            return;
        }
        try{
            const inputParams = provideInfo(args[2])
            console.log(`Info on ${args[2]}`)
            inputParams ? 
                console.log(`\t${inputParams.join('\n\t')}`) :
                console.log('No input arguments needed')
        } catch(e) {
            console.log(e.message)
        }
    },
    'me': async args => {
        if (args.length != 2) {
            console.log('Usage: `sova-cli me`');
            return;
        }
        console.log(me());
    }
};

(async () => {
    let args = process.argv.slice(process.argv[0].match(/node(\.exe)?$/g) ? 1 : 0);
    if (!commands[args[1]] || args[1] === "help") {
        console.log("What you can use:")
        Object.keys(commands).forEach(x => console.log("\t", x));
        return;
    }
    await commands[args[1]](args);
})();