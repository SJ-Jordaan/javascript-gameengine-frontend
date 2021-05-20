const axios = require("axios");
const url = require("url");
const Param = require("./param");

class Requests {
    constructor(apiRootURL, headers) {
        if (typeof apiRootURL !== "string") {
            throw new Error("Provided Root URL is not of type string");
        }

        this._apiURL = apiRootURL;
        this._headers = headers;
        this._service = axios.create({
            headers: this.headers,
            url: this._apiURL,
        });
        this._service.interceptors.response.use(this.handleSuccess, this.handleError);
        this._service.interceptors.request.use(this.handleRequest, this.handleRequestError);
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    handleRequest(config) {
        return config;
    }

    handleRequestError(error) {
        return Promise.reject(error);
    }

    get(path) {
        if (typeof path !== "string") {
            throw new Error("Provided Path is not of type string");
        }

        const reqURL = this._apiURL + path;
        return this._service.get(reqURL, reqParams);
    }

    paramRequest(path, params, method = RequestMethod.POST) {
        if (typeof path !== "string") {
            throw new Error("Provided Path is not of type string");
        }
        if (!Array.isArray(params)) {
            throw new Error("Provided Params should be an Array of type Param");
        }

        if (method !== RequestMethod.GET) {
            const reqParams = new url.URLSearchParams();

            params.forEach((param) => {
                if (param instanceof Param) {
                    reqParams.append(param.key, param.value);
                } else {
                    throw new TypeError("Provided request Params should be of type Param");
                }
            });
        }

        const reqURL = this._apiURL + path;

        switch (method) {
            case RequestMethod.POST:
                return this._service.post(reqURL, reqParams);
            case RequestMethod.PUT:
                return this._service.put(reqURL, reqParams);
            case RequestMethod.DELETE:
                return this._service.delete(reqURL, reqParams);
            case RequestMethod.GET:
                if (params) {
                    const reqParams = new url.URLSearchParams();
                    params.forEach((param) => {
                        if (param instanceof Param) {
                            reqParams.append(param.key, param.value);
                        }
                    });
                    return this._service.get(reqURL, reqParams);
                }
                return this._service.get(reqURL);
            default:
                break;
        }
    }
}

const RequestMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

Object.freeze(RequestMethod);

module.exports = {Requests, RequestMethod};
