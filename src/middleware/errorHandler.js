import { CustomError } from '../utils/errors.js';

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    console.error(err); // Log unexpected errors
    return res.status(500).json({ error: 'Internal Server Error' });
}

export { errorHandler };