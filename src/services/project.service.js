import { User } from '../models/user.model.js';
import { Project } from '../models/project.model.js';
import { BadRequestError, SomethingWentWrong } from '../utils/errors.js';

async function createProject(userId, projectData) {
    const user = await User.findById(userId);

    if (!user) {
        throw new BadRequestError('User not found');
    }

    let data = {
        user: userId,
        ...projectData
    }

    try {
        const project = await Project.create(data);

        data = { projects: [project._id] }
        await User.findByIdAndUpdate(userId, data);
        
        return { message: 'Project Created Successfully' };
    }
    catch (error) {
        throw new SomethingWentWrong(`Error: ${error.message}`);
    }
}

export { createProject };