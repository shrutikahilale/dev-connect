import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createProjectSchema, getProjectSchema } from '../schemas/project.schema.js';
import { validateRequest } from '../middleware/validateInput.js';
import { createProjectController, getProjectController } from '../controllers/project.controller.js';

const router = express.Router();

// Project routes
router.post('/create', validateRequest(createProjectSchema), authenticate, createProjectController);

router.get('/get', validateRequest(getProjectSchema), authenticate, getProjectController);

router.get('/get/:id', validateRequest(getProjectSchema), authenticate, getProjectController);

// router.patch('/update', authenticate, updateProjectController);

// router.delete('/delete', authenticate, deleteProjectController);

export default router;