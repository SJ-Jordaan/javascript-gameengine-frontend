const EventTypes = {
    MOUSE: {
        UP: "mouseup",
        DOWN: "mousedown",
        CLICK: "click",
        DOUBLECLICK: "dblclick",
    },
    KEYBOARD: {
        KEYDOWN: "keydown",
        KEYPRESS: "keypress",
        KEYUP: "keyup",
    },
    FORM: {
        FOCUS: "focus",
        BLUR: "blur",
        CHANGE: "change",
        SUBMIT: "submit",
    },
    WINDOW: {
        SCROLL: "scroll",
        RESIZE: "resize",
        HASHCHANGE: "hashchange",
        LOAD: "load",
        UNLOAD: "unload",
    },
};

Object.freeze(EventType);
export default EventType;
