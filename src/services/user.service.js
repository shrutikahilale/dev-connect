import { User } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError, ConflictError } from '../utils/errors.js';

function generateUsername(firstname, lastname) {
    const uniqueId = uuidv4().split('-')[0]; // Use a portion of UUID for uniqueness
    return `${firstname.toLowerCase()}.${lastname.toLowerCase()}.${uniqueId}`;
}

async function createUser(userData) {
    const { phonenumber, firstname, lastname } = userData;

    if (!phonenumber || !firstname || !lastname) {
        throw new BadRequestError('Required fields are missing');
    }

    const userExists = await User.findOne({ phonenumber });
    if (userExists) {
        throw new ConflictError('User with this phone number already exists');
    }

    await User.create({
        ...userData,
        username: generateUsername(firstname, lastname)
    });

    return { message: 'User created successfully' };
}

export { createUser };