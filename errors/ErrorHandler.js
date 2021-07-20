const { statusCodes: { NOT_FOUND, BAD_REQUEST } } = require('../constants');
const { NOT_FOUND_ERROR } = require('./error-messages.enum');

class ErrorHandler extends Error {
    constructor(status, message, code) {
        super(message);
        this.status = status;
        this.code = code;
    }

    static handleErrors(err, req, res, next) {
        res
            .status(err.status || BAD_REQUEST)
            .json({
                message: err.message || 'Unknown error ((',
                code: err.code || 0
            });
    }

    static throwNotFound() {
        throw new ErrorHandler(NOT_FOUND, NOT_FOUND_ERROR.message, NOT_FOUND_ERROR.code );
    }

    static throwBadRequest(message) {
        throw new ErrorHandler(BAD_REQUEST, message, BAD_REQUEST );
    }
}

module.exports = ErrorHandler;