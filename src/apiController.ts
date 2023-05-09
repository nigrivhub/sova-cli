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

export function runCommand(args){
    const apiFunc = args[0]
    const apiInfo = provideInfo(apiFunc)
    if(apiInfo){
        return apiFunc(...args.slice(1))       
    } 
    return apiFunc()
}