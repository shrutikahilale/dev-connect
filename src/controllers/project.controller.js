import { createProject, getProject, updateProject } from '../services/project.service.js';

const createProjectController = async (req, res, next) => {
    try {
        const userId = req.id;
        const data = req.body;

        const result = await createProject(userId, data);

        res.status(201).json({
            data: result,
            is_success: true
        });
    }
    catch (error) {
        next(error);
    }
}

const getProjectController = async (req, res, next) => {
    try {
        let result;

        if (req.params.id) {
            let projectId = req.params.id;
            let userId = req.id;

            result = await getProject(userId, projectId);
        }
        else {

            let userId = req.id;
            result = await getProject(userId);
        }

        res.status(200).json({
            data: result,
            is_success: true
        });
    }
    catch (error) {
        next(error);
    }
}

const updateProjectController = async (req, res, next) => {
    try {
        const { id, ...data } = req.body;
        const result = await updateProject(id, data);

        res.status(200).json({
            data: result,
            is_success: true
        })
    }
    catch (error) {
        next(error);
    }
}

export { createProjectController, getProjectController, updateProjectController};