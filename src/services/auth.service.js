import { User } from '../models/user.model.js';
import { BadRequestError } from '../utils/errors.js';
import jwt from 'jsonwebtoken';

async function authService(phonenumber) {
    let user = await User.findOne({ phonenumber });

    if (!user) {
        throw (new BadRequestError('User not found'));
    }

    let payload = { id: user._id, role: user.role };
    var token = jwt.sign(payload, process.env.SECRET);

    return token;
}

export {authService};