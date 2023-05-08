import { mkdirSync, writeFileSync } from "fs"
import { homedir } from "os"
import { join } from "path"
import { useApi, readFromStd, readlineWrapper } from "./utils.js"

export async function loginPrompt() {
    let email = "";
    await readlineWrapper(async ({ askForAnyNonEmptyString }) => {
        email = await askForAnyNonEmptyString("Provide email: ");
    })
    const password = await readFromStd({
        prompt: "Provide password: ",
    });
    await authenticate({ email, password });
}

async function authenticate(passes: { email: string; password: string }) {
    const [api, isDev] = useApi();
    try {
        const { jwt } = await api.Login(passes);
        const destinationPath = isDev ? '.sova-cli-dev' : '.sova-cli';
        mkdirSync(join(homedir(), destinationPath), { mode: 0o740, recursive: true });
        writeFileSync(join(homedir(), destinationPath, 'token'), jwt, { mode: 0o640 });
        console.log('\nAuthentication success');
    } catch (e) {
        console.log("\nAuthentication failed, quitting");
        process.exit(1);
    }
}