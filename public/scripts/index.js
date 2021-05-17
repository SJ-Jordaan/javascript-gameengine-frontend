import getFormInputData from "/js/index.js";
import {EventTypes} from "/js/common/constants/eventTypes.js";

class SearchForm {
    constructor(formId) {
        this.searchFormId = formId;
        this.addEventListener("submit", this);
    }

    formSubmitEvent(event) {
        console.log(event);
        const formInput = getFormInputData(searchFormId);
        console.log(formInput);
    }

    handleEvent(event) {
        switch (event.type) {
            case EventTypes.FORM.SUBMIT:
                this.formSubmitEvent(event);
                break;
            default:
                break;
        }
    }
}

const searchForm = new SearchForm("searchform");
SearchForm.addEventListener(EventTypes.FORM.SUBMIT, searchForm);
