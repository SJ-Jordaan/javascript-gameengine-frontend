class EventTypeAndHandler {
    constructor(evType, handler) {
        this.eventType = evType;
        this.eventHandler = handler;
    }

    get Event() {
        return this.eventType;
    }

    get Handler() {
        return this.eventHandler;
    }
}

export {EventTypeAndHandler};
