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

async function updateProject(projectId, data) {
    const project = await Project.findById(projectId);
    if (!project) throw new BadRequestError('Project not found');

    try {

        const { title, description, refLinks, tags } = data;

        // if (title) {
        //     await Project.findByIdAndUpdate(projectId, title);
        // }

        // if (description) {
        //     await Project.findByIdAndUpdate(projectId, description);
        // }

        // if (refLinks) {
        //     const action = refLinks.action;
        //     let dataToUpdate = refLinks.values;

        //     switch (action) {
        //         case 'append':
        //             await Project.findByIdAndUpdate(projectId, { $push: { refLinks: dataToUpdate } })
        //             break;

        //         case 'replace':
        //             await Project.findByIdAndUpdate(projectId, { $set: { refLinks: dataToUpdate } })
        //             break;

        //         default:
        //             throw new BadRequestError(`Invalid action`);
        //     }
        // }


        // if (tags) {
        //     const action = tags.action;
        //     let dataToUpdate = tags.values;

        //     switch (action) {
        //         case 'append':
        //             await Project.findByIdAndUpdate(projectId, { $push: { tags: dataToUpdate } })
        //             break;

        //         case 'replace':
        //             await Project.findByIdAndUpdate(projectId, { $set: { tags: dataToUpdate } })
        //             break;

        //         default:
        //             throw new BadRequestError(`Invalid action`);
        //     }
        // }

        let updatePayload = {};

        if (title) updatePayload.title = title;
        if (description) updatePayload.description = description;
        if (refLinks) {
            const { action, values } = refLinks;

            if (action === 'append') {
                updatePayload.$push = updatePayload.$push || {};
                updatePayload.$push.refLinks = { $each: values };
            }
            else if (action === 'replace') {
                updatePayload.refLinks = values;
            }
        }
        if (tags) {
            const { action, values } = tags;

            if (action === 'append') {
                updatePayload.$push = updatePayload.$push || {};
                updatePayload.$push.tags = { $each: values };
            }
            else if (action === 'replace') {
                updatePayload.tags = values;
            }
        }

        await Project.findByIdAndUpdate(projectId, updatePayload, { new: true })

        return { message: 'Project updated successfully' };
    }
    catch (err) {
        throw new SomethingWentWrong(`Error: ${err.message}`);
    }
}


export { createProject, getProject, updateProject };