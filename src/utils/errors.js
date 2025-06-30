class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class ConflictError extends CustomError {
    constructor(message = 'Conflict') {
        super(message, 409);
    }
}

export { CustomError, BadRequestError, ConflictError };