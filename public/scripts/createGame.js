import Requests from "/public/scripts/common/utility/http/requests.js";
import EventType from "/public/scripts/common/constants/eventType.js";
import Form from "/public/scripts/common/utility/forms/form.js";
import ResponseType from "/public/scripts/common/constants/responseType.js";
import RequestType from "/public/scripts/common/constants/requestType.js";
import Endpoints from "/public/scripts/common/constants/endpoints.js";
import useAPI from "/public/scripts/common/useAPI.js";

class CreateNew {
	constructor(form, apiRequests, apiURL) {
		if (!(form instanceof Form)) {
			throw new Error("Provided Form object is not of type Form");
		} else if (!(apiRequests instanceof Requests)) {
			throw new Error(
				"Provided ApiRequests object is not of type Requests"
			);
		}

		this._form = form;
		this._requests = apiRequests;
		this._apiURL = apiURL;
	}

	get form() {
		return this._form;
	}

	createNewGame(userObject = null) {
		if (!this._form.formData) {
			throw new Error("Form not submitted");
		}

		const body = {
			name: this._form.formData.gameName,
			description: this._form.formData.gameDescription,
		};
		const header = new Headers();
		header.append("Content-Type", "application/json");

		const newGame = useAPI("/games", { ...body }, "POST");
		console.log(newGame);
		// this._requests
		// 	.sendRequestXHR(
		// 		this._apiURL,
		// 		params,
		// 		header,
		// 		ResponseType.JSON,
		// 		RequestType.POST
		// 	)
		// 	.then((response) => {
		// 		if (confirm("New Game Created Successfully!")) {
		// 			window.location.pathname = "/create/workspace";
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		alert("Failed to create new game! Please try again.");
		// 	});
	}
}

const createGameForm = new Form("createGameForm");
const apiRequest = new Requests();
const apiURL = Endpoints.server + "/create/new-game";
const createGame = new CreateNew(createGameForm, apiRequest, apiURL);
window.addEventListener(EventType.FORM.SUBMIT, createGame.form);
window.addEventListener(EventType.FORM.SUBMIT, (event) => {
	createGame.createNewGame();
});
