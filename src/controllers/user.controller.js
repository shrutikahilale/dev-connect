import { createUser, getUser, updateUser } from '../services/user.service.js';

const createUserController = async (req, res, next) => {
    try {
        const { phonenumber, firstname, lastname } = req.body;
        const result = await createUser(phonenumber, firstname, lastname);
        res.status(201).json({
            data: result,
            is_success: true
        });
    } catch (error) {
        next(error); // Pass error to errorHandler
    }
};

const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await updateUser(id);
        res.status(200).json({
            data: result,
            is_success: true
        });
    } catch (error) {
        next(error); // Pass error to errorHandler
    }
};

const getUserController = async (req, res, next) => {
    try {
        const result = await getUser(req.id);
        res.status(200).json({
            data: result.data,
            is_success: true
        });
    } catch (error) {
        next(error); // Pass error to errorHandler
    }
};

export { createUserController, updateUserController, getUserController };