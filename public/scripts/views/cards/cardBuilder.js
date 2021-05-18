import {Card, Button, PresetColours} from "/public/scripts/views/cards/card.js";

class CardBuilder {
    constructor() {
        var head = document.head;
        var link = document.createElement("link");

        if (head.innerHTML.indexOf("dynamic-card.css") <= -1) {
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = "/public/scripts/views/cards/styling/dynamic-card.css";
            head.appendChild(link);
        }
    }

    createGenericCard(card) {
        if (!(card instanceof Card)) {
            throw new TypeError("Provided Card is not of type Card");
        }

        const cardObject = document.createElement("div");
        cardObject.id = "card-object";
        cardObject.classList.add("dynamic-card");
        if (card.colour) {
            cardObject.style.backgroundColor = card.colour.colourToString();
        }

        if (card.image) {
            const cardImage = document.createElement("img");
            cardImage.classList.add("dynamic-card-image");
            cardImage.id = "card-image";
            cardImage.src = card.image;
            cardObject.appendChild(cardImage);
        }

        if (card.header) {
            const cardBodyHeader = document.createElement("div");
            cardBodyHeader.id = "card-body-header";
            cardBodyHeader.classList.add("dynamic-card-header");
            cardBodyHeader.innerHTML = card.header;

            if (card.center) {
                cardBodyHeader.style.textAlign = "center";
            }
            if (card.whiteText) {
                cardBodyHeader.style.color = PresetColours.Light.colourToString();
            }

            cardObject.appendChild(cardBodyHeader);
        }

        const cardBodyContainer = document.createElement("div");
        cardBodyContainer.classList.add("dynamic-card-container");

        if (card.title) {
            const cardBodyTitle = document.createElement("h3");
            cardBodyTitle.id = "card-body-title";
            cardBodyTitle.innerHTML = card.title;
            cardBodyTitle.classList.add("dynamic-card-title");
            if (card.center) {
                cardBodyTitle.style.textAlign = "center";
            }
            if (card.whiteText) {
                cardBodyTitle.style.color = PresetColours.Light.colourToString();
            }
            cardBodyContainer.appendChild(cardBodyTitle);
        }

        if (card.bodyText) {
            const cardBodyText = document.createElement("p");
            cardBodyText.id = "card-body-text";
            cardBodyText.innerText = card.bodyText;
            cardBodyText.classList.add("dynamic-card-text");
            if (card.center) {
                cardBodyText.style.textAlign = "center";
            }
            if (card.whiteText) {
                cardBodyText.style.color = PresetColours.Light.colourToString();
            }
            cardBodyContainer.appendChild(cardBodyText);
            if (card.buttons && Array.isArray(card.buttons) && card.buttons.length > 0) {
                cardBodyContainer.appendChild(this.createButtonContainer(card.buttons, card.center));
            }
        }

        cardObject.appendChild(cardBodyContainer);

        if (card.footer) {
            const cardBodyFooter = document.createElement("div");
            cardBodyFooter.id = "card-body-footer";
            cardBodyFooter.classList.add("dynamic-card-footer");
            cardBodyFooter.innerHTML = card.footer;
            if (card.center) {
                cardBodyFooter.style.textAlign = "center";
            }
            if (card.whiteText) {
                cardBodyFooter.style.color = PresetColours.Light.colourToString();
            }
            cardObject.appendChild(cardBodyFooter);
        }

        return cardObject;
    }

    createButtonContainer(buttons, center = false) {
        if (!Array.isArray(buttons)) {
            throw "Provided Buttons object is not of type Array";
        }

        const cardBodyButtons = document.createElement("div");
        cardBodyButtons.id = "card-body-buttons-container";
        cardBodyButtons.classList.add("dynamic-card-button-container");

        if (center) {
            cardBodyButtons.style.justifyContent = "center";
        }

        buttons.forEach((button) => {
            const bodyButton = document.createElement("button");
            bodyButton.onclick = button.action;
            bodyButton.innerHTML = button.title;
            bodyButton.id = button.id;
            bodyButton.classList.add("dynamic-card-button");
            bodyButton.style.backgroundColor = button.colour.colourToString();
            bodyButton.style.fontSize = button.fontSize;

            cardBodyButtons.appendChild(bodyButton);
        });

        return cardBodyButtons;
    }
}

export default CardBuilder;
