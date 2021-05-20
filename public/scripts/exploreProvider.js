import CardBuilder from "/public/scripts/view-components/cards/cardBuilder.js";
import {
	Card,
	Button,
	PresetColours,
	PresetFontSize,
} from "/public/scripts/view-components/cards/card.js";
import { Explore } from "/public/scripts/explore.js";
import EventType from "/public/scripts/common/constants/eventType.js";
import { EventTypeAndHandler } from "/public/scripts/common/utility/events/events.js";
import Requests from "/public/scripts/common/utility/http/requests.js";
import Form from "/public/scripts/common/utility/forms/form.js";
import useAPI from "/public/scripts/common/useAPI.js";
const builder = new CardBuilder();
const card = new Card();
card.title = "Test Card";
card.header = "Card Header";
card.footer = "Card Footer";
card.bodyText = "This is Test Body Text";
card.center = true;
card.colour = PresetColours.Dark;
card.whiteText = true;
card.image =
	"https://images.unsplash.com/photo-1469532844423-7e9107f9a96f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1058&q=80";

const games = await useAPI("/games");

console.log(games);
const elem = document.getElementById("searchResults");

games.forEach((element) => {
	const card = new Card();

	const button = new Button();
	button.title = "Go to game >";
	button.id = element.id;
	button.colour = PresetColours.Primary;
	button.fontSize = PresetFontSize.Smaller;
	button.action = (ev) => {
		window.location = `/create/workspace/${element.id}`
		console.log(ev);
	};
	card.title = element.name;
	card.header = element.createdAt;
	card.footer = element.creator.username;
	card.bodyText = element.description;
	card.center = true;
	card.colour = PresetColours.Dark;
	card.whiteText = true;
	card.image = "";
	card.buttons = [button];

	elem.appendChild(builder.createGenericCard(card));
});

// var buttons = new Array();
// for (var i = 0; i < 1; i++) {
// 	const button = new Button();
// 	button.title = "Button" + i.toString();
// 	button.id = i.toString();
// 	button.colour = PresetColours.Primary;
// 	button.fontSize = PresetFontSize.Smaller;
// 	button.action = (ev) => {
// 		console.log(ev);
// 	};
// 	buttons.push(button);
// }

// card.buttons = buttons;
// const elem = document.getElementById("searchResults");

// for (var i = 0; i < 10; i++) {
// 	let cardWrapper = builder.createGenericCard(card);
// 	elem.appendChild(cardWrapper);
// }

const ex = new Explore(
	new Form("searchForm"),
	new Form("orderByForm"),
	new Requests()
);
// searchForm.addEventTypeAndHandler(new EventTypeAndHandler(EventType.FORM.SUBMIT, (result) => {
//     console.log("RESULT: " + JSON.stringify(result));
// }));
window.addEventListener(EventType.FORM.SUBMIT, ex.searchForm);
