import { User } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError, ConflictError } from '../utils/errors.js';

function generateUsername(firstname, lastname) {
  const uniqueId = uuidv4().split('-')[0]; // Use a portion of UUID for uniqueness
  return `${firstname.toLowerCase()}.${lastname.toLowerCase()}.${uniqueId}`;
}

async function createUser(phonenumber, firstname, lastname) {
  const userExists = await User.findOne({ phonenumber });
  if (userExists) {
    throw new ConflictError('User with this phone number already exists');
  }

  await User.create({
    phonenumber: phonenumber,
    firstname: firstname,
    lastname: lastname,
    username: generateUsername(firstname, lastname)
  });

  return { message: 'User created successfully' };
}

async function getUser(username) {
  const userExists = await User.findOne({ username });
  if (userExists) return { data: userExists };
  throw new BadRequestError('User not found');
}

async function updateUser({ id }) {
  const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new NotFoundError('User not found');
  }

  return { message: 'User updated successfully' };
}


export { createUser, getUser, updateUser };