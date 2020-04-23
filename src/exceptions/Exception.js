export default class Exception {

    constructor(message, code = 'GENERIC') {
        this._message = message;
        this._code = code;
    }


    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }
}
