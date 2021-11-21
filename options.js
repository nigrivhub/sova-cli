const fs = require("fs");
const readline = require('readline');
const os = require("os");
const path = require("path");
const userHomeDir = os.homedir();

module.exports = {
    name: "sova-cli",
    getToken: () => {
        try {
            return JSON.parse(fs.readFileSync(path.join(userHomeDir, ".sova", "token")).toString()).token;
        } catch (e) {
            console.error("Unable to read token", e);
            return "";
        }
    },
    authenticate: () => {

        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.stdoutMuted = true;
        rl.question('Authentication key: ', (token) => {
            console.log();
            try {
                fs.mkdirSync(path.join(userHomeDir, ".sova"), {
                    mode: 0o740,
                    recursive: true,
                })
                fs.writeFileSync(path.join(userHomeDir, ".sova", "token"), JSON.stringify({ token }), {
                    mode: 0o640,
                });
                console.log("Done.");
            } catch (e) {
                console.error("Error: ", e);
            }
            rl.close();
        });

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMuted)
                rl.output.write("*");
            else
                rl.output.write(stringToWrite);
        };
    },
};