const Api = require("./api.js");
const options = require("./options");

const getMethods = (obj) => {
    let result = new Set();
    let it = obj;
    while (it = Object.getPrototypeOf(it)) {
        Object.getOwnPropertyNames(it).forEach(item => result.add(item))
    }
    return [...result.keys()].filter(item => item.match(/^[A-Z]/g) && typeof obj[item] === 'function');
};

module.exports = class CLI {

    constructor() {
        this.client = new Api();
        this.options = options;
    }

    async invoke(args) {
        let callArgs = this._processArgs(args);
        if (callArgs.methodName == "help") {
            return this._provideHelp(callArgs);
        }
        if (!this.client[callArgs.methodName]) {
            return `No such command, check: "${this.options.name} help"`;
        }
        return await this.client[callArgs.methodName](callArgs.args);
    }

    _provideHelp(callArgs) {
        let functionProvided = Object.keys(callArgs.args)[0];
        if (!functionProvided) {
            return getMethods(this.client).join("\n");
        }
        let params = this.client[`${functionProvided}Input`] || [];
        return `Usage: ${this.options.name} ${functionProvided} ${params.map(el => `--${el} <value>`)}`;
    }

    _processArgs(args) {
        if (!args) {
            throw new Error("No args provided");
        }
        switch (typeof args) {
            case "string":
                return this._processArgsOfLine(args);
            case "object":
                if (Array.isArray(args)) {
                    return this._processArgsOfArray(args);
                }
        }
        throw new Error("Not supported type of args");
    }

    _processArgsOfLine(line) {
        return this._processArgsOfArray(line.split(" "));
    }

    _processArgsOfArray(array) {
        let result = {
            methodName: "",
            args: {},
        };
        let key_enabled = "";
        array.slice(1).forEach(arg => {
            if (!result.methodName) {
                result.methodName = arg;
                return;
            }
            let is_key = arg.startsWith("--");
            if (is_key) arg = arg.slice(2);
            if (key_enabled) {
                result.args[key_enabled] = arg;
                key_enabled = "";
            } else {
                key_enabled = arg;
                result.args[arg] = true;
            }
        });
        return result;
    }
}