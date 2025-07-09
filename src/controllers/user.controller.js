import { createUser, getUser, updateUser } from '../services/user.service.js';
import { BadRequestError } from '../utils/errors.js';

const createUserController = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError('Request body is missing');
        }

        console.log('Request body:', req.body); // Log the request body for debugging
        const result = await createUser(req.body);
        return res.status(201).json(result);
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

const updateUserController = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError('Request body is missing');
        }

        console.log('Request body:', req.body); // Log the request body for debugging
        const result = await updateUser(req.body);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}

const getUserController = async (req, res, next) => {
    try{
        if(!req.query) {
            throw new BadRequestError('Request param is missing');
        }

        console.log('Request query:', req.query); // Log the request params for debugging
        const result  = await getUser(req.query.username);
        return res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

export { createUserController, updateUserController, getUserController };