import Form from "/public/scripts/common/utility/forms/form.js";
import EventType from "/public/scripts/common/constants/eventType.js";
import {EventTypeAndHandler} from "/public/scripts/common/utility/events/events.js";

class SearchForm extends Form {
    constructor(formId) {
        super(formId);
    }

    // addEventTypeAndHandler(eventHandler, replace = false) {
    //     if (!(eventHandler instanceof EventTypeAndHandler)) {
    //         throw "Even Handler provided is not of type EventTypeAndHandler";
    //     }

    //     if (replace) {
    //         const index = this.events.findIndex((x) => x.EventType === eventHandler.EventType);
    //         const handlerIndex = this.eventsAndHandlers.findIndex((x) => x.EventType === eventHandler.EventType);
    //         if (index > -1) {
    //             this.events.removeAt(index);
    //         }
    //         if (handlerIndex > -1) {
    //             this.eventsAndHandlers.removeAt(handlerIndex);
    //         }
    //     }

    //     this.eventsAndHandlers.push(eventHandler);
    // }

    // getFormData() {
    //     const formData = new FormData(document.querySelector(`#${this.searchFormId}`));
    //     const formValues = {};

    //     for (let keyval of formData.entries()) {
    //         formValues[keyval[0]] = keyval[1];
    //     }

    //     return formValues;
    // }

    // handleEvent(event) {
    //     event.preventDefault();
    //     this.formData = this.getFormData();

    //     console.log(this.formData);
    //     this.eventsAndHandlers.forEach((ev) => {
    //         if (event.type === ev.EventType) {
    //             ev.Handler(this.formData);
    //         }
    //     });
    // }
}

export default SearchForm;
