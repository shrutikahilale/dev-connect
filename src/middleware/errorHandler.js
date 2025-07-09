import { CustomError } from '../utils/errors.js';

function errorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
            errors: Object.keys(err.errors).reduce((acc, key) => {
                acc[key] = err.errors[key].message;
                return acc;
            }, {})
        });
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    console.error(err); // Log unexpected errors
    return res.status(500).json({ error: 'Internal Server Error' });
}

export { errorHandler };