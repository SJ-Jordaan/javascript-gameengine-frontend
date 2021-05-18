import {EventTypeAndHandler} from "/public/scripts/common/utility/events/events.js";
import EventType from "/public/scripts/common/constants/eventType.js";

class Form {
    constructor(id) {
        this.formId = id;
        this.eventsAndHandlers = new Array();
        this.formData;
        this.form = document.querySelector(`#${id}`);
    }

    addEventTypeAndHandler(eventHandler, replace = false) {
        if (!(eventHandler instanceof EventTypeAndHandler)) {
            throw "Even Handler provided is not of type EventTypeAndHandler";
        }

        if (replace) {
            const index = this.events.findIndex((x) => x.EventType === eventHandler.EventType);
            const handlerIndex = this.eventsAndHandlers.findIndex((x) => x.EventType === eventHandler.EventType);
            if (index > -1) {
                this.events.removeAt(index);
            }
            if (handlerIndex > -1) {
                this.eventsAndHandlers.removeAt(handlerIndex);
            }
        }

        this.eventsAndHandlers.push(eventHandler);
    }

    getFormData() {
        const formData = new FormData(document.querySelector(`#${this.formId}`));
        const formValues = {};

        for (let keyval of formData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        return formValues;
    }

    static getFormInputData(formId) {
        const formData = new FormData(document.querySelector(`#${formId}`));
        const formValues = {};

        for (let keyval of formData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        return formValues;
    }

    handleEvent(event) {
        event.preventDefault();
        console.log(event);
        this.formData = this.getFormData();

        console.log("BEFORE: " + JSON.stringify(this.formData));
        this.eventsAndHandlers.forEach((ev) => {
            if (event.type === ev.EventType) {
                ev.Handler(this.formData);
            }
        });
    }
}

export default Form;
