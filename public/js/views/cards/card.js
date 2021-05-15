class Card {
    constructor() {}

    set title(value) {
        if (typeof value === "string") this._title = value;
        else throw TypeError("Provided Title is not of type String");
    }

    get title() {
        return this._title;
    }

    set bodyText(value) {
        if (typeof value === "string") this._bodyText = value;
        else throw TypeError("Provided Body Text is not of type String");
    }

    set buttons(value) {
        if (Array.isArray(value)) {
            value.forEach((button) => {
                if (!(button instanceof Button)) {
                    throw TypeError("Provided Array should have elements of type Button");
                }
            });
        }
        this._buttons = value;
    }

    set image(value) {
        if (typeof value === "string") this._image = value;
        else throw TypeError("Provided Image is not of type String");
    }

    set header(value) {
        if (typeof value === "string") this._header = value;
        else throw TypeError("Provided Header Text is not of type String");
    }

    set center(value) {
        if (typeof value === "boolean") this.center = value;
        else throw TypeError("Provided Center is not of type Boolean");
    }

    set border(value) {
        if (typeof value === "boolean") this._border = value;
        else throw TypeError("Provided Border is not of type Boolean");
    }

    set whiteText(value) {
        if (typeof value === "boolean") this._whiteText = value;
        else throw TypeError("Provided WhiteText is not of type Boolean");
    }

    set colour(value) {
        if (value instanceof Colour) this._colour = value;
        else throw TypeError("Provided Colour is not of type Colour");
    }

    get bodyText() {
        return this._bodyText;
    }
    get buttons() {
        return this._buttons;
    }
    get image() {
        return this._image;
    }
    get header() {
        return this._header;
    }
    get center() {
        return this._center;
    }
    get border() {
        return this._border;
    }
    get whiteText() {
        return this._whiteText;
    }
    get colour() {
        return this._colour;
    }
}

class Button {
    constructor(title, id, action, colour, fontSize) {
        this.title = title;
        this.id = id;
        this.action = action;
        this.colour = colour;
        this.fontSize = fontSize;
    }

    colourToString() {
        return `rgba(${this.colour.red}, ${this.colour.green}, ${this.colour.blue}, ${this.colour.alpha})`;
    }
}

class Colour {
    constructor(red, green, blue, alpha) {
        if (
            typeof red === "number" &&
            typeof green === "number" &&
            typeof blue === "number" &&
            typeof alpha === "number"
        ) {
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
        } else {
            throw new "Provided Colour is not of type Number"();
        }
    }
}

var PresetColours = {
    Primary: new Colour(2, 117, 216, 1),
    Secodnary: new Colour(92, 184, 92, 1),
    Dark: new Colour(41, 43, 44, 1),
    Danger: new Colour(217, 83, 79, 1),
    Light: new Colour(247, 247, 247, 1),
};

var PresetFontSize = {
    Small: "10px",
    Smaller: "12px",
    Medium: "16px",
    Larger: "20px",
    Large: "24px",
};

Object.freeze(PresetColours);
Object.freeze(PresetFontSize);

export {Card, Button, PresetColours, PresetFontSize};
