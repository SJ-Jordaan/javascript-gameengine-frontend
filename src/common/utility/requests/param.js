class Param {
    constructor(property, value) {
        this._key = property;
        this._value = value;
    }

    get param() {
        return {[this._key]: this._value};
    }

    get key() {
        return this._key;
    }

    get value() {
        return this._value;
    }
}

module.exports = Param;
