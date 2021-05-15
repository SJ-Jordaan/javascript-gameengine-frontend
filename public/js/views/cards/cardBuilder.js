import {Card, Button, PresetColours} from "/js/views/cards/card.js";

class CardBuilder {
    constructor() {
        var head = document.head;
        var link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "/js/views/cards/styling/dynamic-card.css";
        head.appendChild(link);
    }

    createGenericCard(card) {
        if (!(card instanceof Card)) {
            throw new TypeError("Provided Card is not of type Card");
        }

        const cardObject = document.createElement("div");
        cardObject.id = "card-object";
        cardObject.classList.add("dynamic-card");

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

            cardObject.appendChild(cardBodyHeader);
        }

        const cardBodyContainer = document.createElement("div");
        cardBodyContainer.classList.add("dynamic-card-container");

        if (card.title) {
            const cardBodyTitle = document.createElement("h3");
            cardBodyTitle.id = "card-body-title";
            cardBodyTitle.innerHTML = card.title;
            cardBodyTitle.classList.add("dynamic-card-title");
            cardBodyContainer.appendChild(cardBodyTitle);
        }

        if (card.bodyText) {
            const cardBodyText = document.createElement("p");
            cardBodyText.id = "card-body-text";
            cardBodyText.innerText = card.bodyText;
            cardBodyText.classList.add("dynamic-card-text");
            cardBodyContainer.appendChild(cardBodyText);
            if (card.buttons && card.buttons.length > 0) {
                const cardBodyButtons = document.createElement("div");
                cardBodyButtons.id = "card-body-buttons-container";
                cardBodyButtons.classList.add("dynamic-card-button-container");
                const buttons = card.buttons;

                buttons.forEach((button) => {
                    const bodyButton = document.createElement("button");
                    bodyButton.onclick = button.action;
                    bodyButton.innerHTML = button.title;
                    bodyButton.id = button.id;
                    bodyButton.classList.add("dynamic-card-button");
                    bodyButton.style.backgroundColor = button.colourToString();
                    bodyButton.style.fontSize = button.fontSize;

                    cardBodyButtons.appendChild(bodyButton);
                });
                cardBodyContainer.appendChild(cardBodyButtons);
            }
        }

        cardObject.appendChild(cardBodyContainer);

        if (card.footer) {
            const cardBodyFooter = document.createElement("div");
            cardBodyFooter.id = "card-body-footer";
            cardBodyFooter.classList.add("dynamic-card-footer");
            cardBodyFooter.innerHTML = card.footer;

            cardObject.appendChild(cardBodyFooter);
        }

        return cardObject;
    }

    createComplete;
}

export default CardBuilder;
