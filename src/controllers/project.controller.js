import { createProject } from '../services/project.service.js';

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

export { createProjectController };