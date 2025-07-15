import { authService } from '../services/auth.service.js';

const createAuth = async (req, res, next) => {
    try {
        const { phonenumber } = req.body;
        let data = await authService(phonenumber);
        res.status(200).json({
            data,
            is_success: true
        });
    }
    catch (error) {

        next();
    }
}

export { createAuth };