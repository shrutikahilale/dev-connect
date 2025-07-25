class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class Unauthorized extends CustomError {
    constructor(message = 'Unauthorized user') {
        super(message, 401);
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

class SomethingWentWrong extends CustomError {
    constructor(message = 'Bad Request') {
        super(message, 500);
    }
}

export { CustomError, BadRequestError, ConflictError, Unauthorized, SomethingWentWrong };