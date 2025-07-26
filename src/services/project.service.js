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

        await User.findByIdAndUpdate(userId, {
            $push: { projects: project._id }
        });
        return { message: 'Project Created Successfully' };
    }
    catch (error) {
        throw new SomethingWentWrong(`Error: ${error.message}`);
    }
}

async function getProject(userId, projectId) {
    if (projectId) {
        const project = await Project.findById(projectId);
        if (!project) throw new BadRequestError('Project not found');
        return project;
    }

    const user = await User.findById(userId);
    if (!user) throw new BadRequestError('User not found');

    const projectIds = user.projects;

    let data = await Project.find({ _id: { $in: projectIds } }); // get all docs where _id has one of the projectsIds as _id

    return data;
}


export { createProject, getProject };