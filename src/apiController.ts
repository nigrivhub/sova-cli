import { mkdirSync, writeFileSync } from "fs"
import { homedir } from "os"
import { join } from "path"
import { useApi, readFromStd, readlineWrapper, getApiFunctions } from "./utils.js"

export function provideInfo(name:string):string[] | undefined {
    const possbileNames = getApiFunctions()
    const [api, isDev] = useApi()
    if(possbileNames.indexOf(name) == -1) throw new Error('No such function in the Api')
    const inputObj = api[`${name}Input`]
    return inputObj
}