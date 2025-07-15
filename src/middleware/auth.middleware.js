import jwt from 'jsonwebtoken';
import { Unauthorized } from '../utils/errors.js';

async function authenticate(req, res, next) {
    let token = req.get('x-auth');

    if (!token) {
        return next(new Unauthorized('Unauthoized user'));
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.id = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new Unauthorized('Token expired'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new Unauthorized('Invalid token'));
        }
        return next(error); // Pass other errors to the error-handling middleware
    }
}

export { authenticate };