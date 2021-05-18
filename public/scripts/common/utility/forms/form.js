import {EventTypeAndHandler} from "/public/scripts/common/utility/events/events.js";

class Form {
    constructor(id) {
        this._formId = id;
        this._eventsAndHandlers = new Array();
        this._formData;
        this._form = document.querySelector(`#${this._formId}`);

        if (!this._form) {
            throw new Error("No form found for specified Id");
        }
    }

    get formData() {
        return this._formData;
    }

    get eventsAndHandlers() {
        return this._eventsAndHandlers;
    }

    get form() {
        return this._form;
    }

    addEventTypeAndHandler(eventHandler, replace = false) {
        if (!(eventHandler instanceof EventTypeAndHandler)) {
            throw "Even Handler provided is not of type EventTypeAndHandler";
        }

        if (replace) {
            const index = this._eventsAndHandlers.findIndex((x) => x.EventType === eventHandler.EventType);
            if (index > -1) {
                this._eventsAndHandlers.removeAt(index);
            }
        }

        this._eventsAndHandlers.push(eventHandler);
    }

    removeEventAndHandler(eventIndex) {
        if (eventIndex > -1) {
            this._eventsAndHandlers.removeAt(eventIndex);
        }
    }

    getFormData() {
        const fData = new FormData(document.querySelector(`#${this._formId}`));
        const formValues = {};

        for (let keyval of fData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        return formValues;
    }

    static getFormInputData(id) {
        const fData = new FormData(document.querySelector(`#${id}`));
        const formValues = {};

        for (let keyval of fData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        return formValues;
    }

    handleEvent(event) {
        event.preventDefault();
        this._formData = this.getFormData();

        this._eventsAndHandlers.forEach((ev) => {
            if (event.type === ev.EventType) {
                ev.Handler(this._formData);
            }
        });
    }
}

export default Form;
