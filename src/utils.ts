import readline from "readline";
import  DevApi  from "../api/api-dev.js";
import ProdApi from "../api/api.js";
import path from "path";
import { env } from "process";
import { readFileSync } from "fs";
import { homedir } from "os";

export const green = x => `\x1b[32m${x}\x1b[0m`;

interface readlineWrapperInput {
    askForAnyNonEmptyString: (question: string) => Promise<string>;
    askForStringFromGiveList: (question: string, list: string[]) => Promise<string>;
    askForAnyEvenEmptyString: (question: string) => Promise<string | undefined>;
}
export async function readlineWrapper(body: (readlineWrapperInput) => Promise<any>) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    let tmpError = undefined;
    try {
        await body({
            askForAnyNonEmptyString: x => askForAnyNonEmptyString(rl, x),
            askForStringFromGiveList: (x, y) => askForStringFromGivenList(rl, x, y),
            askForAnyEvenEmptyString: x => askForAnyEvenEmptyString(rl, x),
        });
    } catch (e) {
        tmpError = e;
    }
    rl.close();
    if (tmpError) {
        throw tmpError;
    }
}

export async function askForAnyNonEmptyString(rl, question: string): Promise<string> {
    let answer = await askForAnyEvenEmptyString(rl, question);
    if (!answer) {
        throw new Error("NO_INPUT_PROVIDED");
    }
    return answer;
}

export async function askForStringFromGivenList(rl, question: string, list: string[]): Promise<string> {
    console.log(question);
    list.forEach((v, i) => console.log(`[${i}] ${v}`));
    let answer = await askForAnyNonEmptyString(rl, "Type index of your answer: ");
    if (!list[answer]) {
        throw new Error("ELEMENT_NOT_FOUND");
    }
    return list[answer];
}

export async function askForAnyEvenEmptyString(rl, question: string): Promise<string | undefined> {
    return new Promise<string>(resolve => rl.question(question, resolve));
}

export async function helloRecursion(body: () => Promise<any>) {
    try {
        await body();
    } catch (e) {
        await helloRecursion(body);
    }
}

function getToken(envIsDev:boolean){
    try {
        const token = readFileSync(path.join(homedir(), `.sova-cli${ envIsDev ? '-dev' : ''}`, 'token').toString()).toString()
        return token
    } catch(e) {
        return ''
    }
}

export function readJWT(jwt:string){
    return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString())
}

export const isDev = process.env.NODE_ENV == 'dev';
export function useApi(): [ProdApi, boolean] {
    console.log('DA',DevApi, 'PA', ProdApi)
    let api = new (isDev ? DevApi : ProdApi)();
    api._driver.getToken = getToken(isDev)
    if (isDev) {
        console.log()
        console.log('running in dev env')
    }
    return [api, isDev];
}

export function me() {
    const [_, isDev] = useApi()
    const tok = getToken(isDev)
    if(tok === '') return {}
    return readJWT(tok)
}

export async function readFromStd(params: { prompt: string }) {
    return new Promise<string>((resolve) => {
        const { stdout, stdin } = process;

        console.log()
        stdout.write(params.prompt)
        stdin.setRawMode(true)
        stdin.resume()
        stdin.setEncoding("utf-8")
        let input = "";
    
        const enter = async () => {
            stdin.removeListener("data", handler);
            stdin.setRawMode(false);
            stdin.pause();
            resolve(input);
        }
    
        const onInputInterrupt = () => {
            stdin.removeListener("data", handler)
            stdin.setRawMode(false)
            stdin.pause()
        }
    
        const newchar = c => {
            input += c;
            stdout.write("*");
        };
    
        const backspace = () => {
            readline.moveCursor(stdout, -1, 0)
            stdout.write(" ")
            readline.moveCursor(stdout, -1, 0)
            input = input.slice(0, input.length - 1)
        };
    
        const CTRL_D = "\u0004";
        const CTRL_C = "\u0003";
        const BACKSPACE = 127;
        const handler = (data) => {
            switch (data) {
                case "\r":
                case "\n":
                    return enter();
                case CTRL_D:
                case CTRL_C:
                    return onInputInterrupt();
                default:
                    if (data.charCodeAt(0) === BACKSPACE) {
                        return backspace();
                    }
                    else {
                        return newchar(data);
                    }
            }
        }
        stdin.on("data", handler)
    });   
}

export function getApiFunctions(){
    const [Api, _] = useApi()
    return Object.keys(Api)
        .filter(el => el.endsWith('Input'))
        .map(el => el.slice(0,-5))
}