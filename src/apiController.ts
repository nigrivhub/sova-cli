import { useApi, readlineWrapper, getApiFunctions, green } from "./utils.js"

export function provideInfo(name:string):string[] | undefined {
    const possbileNames = getApiFunctions()
    const [api, isDev] = useApi()
    if(possbileNames.indexOf(name) == -1) throw new Error('No such function in the Api')
    const inputObj = api[`${name}Input`]
    return inputObj
}

export async function runCommand(args){
    const [api, isDev] = useApi()
    const apiFunc = args[0]
    const apiInfo = provideInfo(apiFunc)
    const funcParams = {}
    if(apiInfo){
        await readlineWrapper(async ({askForAnyEvenEmptyString}) => {
            for(let endpointArgument of apiInfo){
                const val = await askForAnyEvenEmptyString(`Provide value for argument: ${green(endpointArgument)} (Or press enter if you want to leave it blank):\n\r `)
                funcParams[endpointArgument] = val
            }
        })
    } 
    return api[apiFunc](funcParams)
}