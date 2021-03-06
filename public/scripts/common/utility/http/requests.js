import ResponseType from "/public/scripts/common/constants/responseType.js";
import RequestType from "/public/scripts/common/constants/requestType.js";

class Requests {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.respType = undefined;
    }

    static SendGETRequestXHR(url, responseType = ResponseType.JSON) {
        if (!url) {
            throw "URL not Provided";
        }

        if (typeof url !== "string") {
            throw "Route must be string";
        }

        const xhrHttpReq = new XMLHttpRequest();
        xhrHttpReq.open(RequestType.GET, url);
        xhrHttpReq.responseType = responseType;

        return new Promise((resolve, reject) => {
            xhrHttpReq.onload = () => {
                if (xhrHttpReq.status >= 400) {
                    reject(xhrHttpReq.response);
                } else {
                    resolve(xhrHttpReq.response);
                }
            };

            xhrHttpReq.onerror = () => {
                reject("Request failed");
            };

            xhrHttpReq.send();
        });
    }

    sendRequestXHR(url, params, headers = null, responseType = ResponseType.JSON, requestType = RequestType.GET) {
        if (!url) {
            throw "URL not Provided";
        }

        if (typeof url !== "string") {
            throw "URL must be string";
        }

        if (headers) {
            if (!(headers instanceof Headers)) {
                throw new TypeError("provided headers object is not of type Headers");
            }
        }

        switch (responseType) {
            case ResponseType.JSON:
                this.respType = ResponseType.JSON;
                break;
            case ResponseType.XML:
                this.respType = ResponseType.XML;
                break;
            default:
                this.respType = undefined;
                throw new Error("Invalid ResponseType");
        }

        switch (requestType) {
            case RequestType.GET:
                let paramString = typeof params === "object" ? this.createGetParams(params) : "";
                url = url + paramString;
                this.xhr.open(RequestType.GET, url);
                break;
            case RequestType.PUT:
                this.xhr.open(RequestType.PUT, url);
                break;
            case RequestType.POST:
                this.xhr.open(RequestType.POST, url);
                break;
            default:
                break;
        }

        headers.forEach((value, key) => {
            this.xhr.setRequestHeader(key, value);
        });

        this.xhr.responseType = responseType;

        return new Promise((resolve, reject) => {
            this.xhr.onload = () => {
                if (this.xhr.status >= 400) {
                    reject(this.xhr.response);
                } else {
                    resolve(this.xhr.response);
                }
            };

            this.xhr.onerror = () => {
                reject("Request failed");
            };

            if (requestType === RequestType.GET) this.xhr.send();
            else this.xhr.send(JSON.stringify(params));
        });
    }

    static SendGETRequestFetch(url) {
        return fetch(url).then((response) => {
            if (response.status >= 400) {
                return response.json().then((errorData) => {
                    const error = new Error("Request Failed");
                    error.data = errorData;
                    throw error;
                });
            } else {
                return response.json();
            }
        });
    }

    sendRequestFetch(url, params, headers = null, requestType = RequestType.GET) {
        if (headers) {
            if (!(headers instanceof Headers)) {
                throw new TypeError("provided headers object is not of type Headers");
            }
        }

        headers.append("Content-Type", "applicaton/json");

        return fetch(url, {
            method: requestType,
            body: JSON.stringify(params),
            headers: params ? headers : {},
        }).then((response) => {
            if (response.status >= 400) {
                return response.json().then((errorData) => {
                    const error = new Error("Request Failed");
                    error.data = errorData;
                    throw error;
                });
            } else {
                return response.json();
            }
        });
    }

    createGetParams(params) {
        const paramString = "";

        Object.keys(params).forEach((key) => {
            paramString += `${key}=${params[key]}`;

            const index = params.findIndex((param) => param.key == key);
            if (index > -1 && index < params.length - 1) {
                paramString += "?";
            }
        });

        return paramString;
    }
}

export default Requests;
