import Form from "/public/scripts/common/utility/forms/form.js";
import EventType from "/public/scripts/common/constants/eventType.js";
import Requests from "/public/scripts/common/utility/http/requests.js";

class ExploreItem {
    constructor(gameId, gameName, year, creatorName, description) {
        this._gameId = gameId;
        this._gameName = gameName;
        this._year = year;
        this._creatorName = creatorName;
        this._description = description;
    }

    get gameId() {
        return this._gameId;
    }

    get gameName() {
        return this._gameName;
    }

    get year() {
        return this._year;
    }

    get creatorName() {
        return this._creatorName;
    }

    get description() {
        return this._description;
    }
}

class Explore {
    constructor(searchForm, orderByForm, serverApi) {
        if (!(searchForm instanceof Form) || !(orderByForm instanceof Form)) {
            throw new Error("Provided forms should be of type Form");
        }

        if (!(serverApi instanceof Requests)) {
            throw new Error("Provided Server API should be of Type Requests");
        }

        this._searchForm = searchForm;
        this._orderByForm = orderByForm;
        this._serverApi = serverApi;
        this._serverResponse;
    }

    get searchForm() {
        return this._searchForm;
    }

    get orderByForm() {
        return this._orderByForm;
    }

    getSearchResults() {
        if (!this._searchForm) {
            throw new Error("Search Form not initialized");
        }

        if (!this._searchForm.submittedFormData) {
            throw new Error("Search Form not Submitted");
        }

        return new Promise((resolve, reject) => {
            resolve(true);
            reject(false);
        });
    }

    orderBy() {}
}

export {Explore, ExploreItem};
