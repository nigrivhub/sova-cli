const fetch = require("isomorphic-fetch");
const options = require("./options");

module.exports = class ApiDriver {

    constructor({ host } = { host: "" }) {
        this.host = host || API_HOST;
    }

    getApiHost() {
        return this.host;
    }

    getApiFullPath() {
        return 'https://' + this.getApiHost();
    }

    opaqueURL(uri) {
        return new URL([this.getApiFullPath(), uri].join(""));
    }

    getToken() {
        return options.getToken();
    }

    sendPost({ endpoint, data } = {}) {
        return this.post({
            endpoint,
            data,
            authorization: this.getToken(),
        });
    }

    sendPut({ endpoint, data } = {}) {
        return this.put({
            endpoint,
            data,
            authorization: this.getToken(),
        });
    }

    sendGet({ endpoint } = {}) {
        return this.get({
            endpoint,
            authorization: this.getToken(),
        });
    }

    sendDelete({ endpoint, data } = {}) {
        return this.delete({
            endpoint,
            data,
            authorization: this.getToken(),
        });
    }

    get({ endpoint, authorization } = {}) {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (authorization) headers.Authorization = authorization;
        return fetch(endpoint, {
            method: 'GET',
            headers: headers,
            credentials: 'include',
            mode: 'cors'
        }).then(x => this.checkStatus(x)).then(y => this.parseJSON(y));
    }

    post({ endpoint, data = {}, authorization, headers = {} } = {}) {
        if (!headers["Content-Type"]) {
            headers["Content-Type"] = 'application/json';
        }
        if (authorization) headers.Authorization = authorization;
        return fetch(endpoint, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data),
        }).then(x => this.checkStatus(x)).then(y => this.parseJSON(y));
    }

    put({ endpoint, data = {}, authorization, headers = {} } = {}) {
        if (!headers["Content-Type"]) {
            headers["Content-Type"] = 'application/json';
        }
        if (authorization) headers.Authorization = authorization;
        return fetch(endpoint, {
            method: 'PUT',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(data),
            mode: 'cors'
        }).then(x => this.checkStatus(x)).then(y => this.parseJSON(y));
    };

    delete({ endpoint, data = {}, authorization } = {}) {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (authorization) headers.Authorization = authorization;
        return fetch(endpoint, {
            method: 'DELETE',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(data),
            mode: 'cors'
        }).then(x => this.checkStatus(x)).then(y => this.parseJSON(y));
    }

    upload({ endpoint, file, type } = {}) {
        return fetch(endpoint, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type != '' ? file.type : (type || 'application/octet-stream')
            }
        }).then(x => this.checkStatus(x))
    }

    download({ endpoint, headers } = {}) {
        return fetch(endpoint, {
            method: "GET",
            headers,
        }).then(x => this.checkStatus(x))
    }

    checkStatus(response) {
        if (!response) return;
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else this.onStatus(response.status, response);
    }

    onStatus(status, response) {
        if (status >= 400 && status < 600) {
            let error = new Error(response.statusText || response.status)
            error.response = response;
            throw error;
        }
    }

    async parseJSON(response) {
        try {
            if (response && response.json)
                return await response.json();
        } catch (e) {
            return response;
        }
    }
}