import express from 'express';
import { createUserController, updateUserController, getUserController } from '../controllers/user.controller.js';
import { validateRequest } from '../middleware/validateInput.js';
import { getUserSchema, updateUserSchema, createUserSchema } from '../schemas/user.schema.js';
const router = express.Router();

// User routes
router.post('/create', validateRequest(createUserSchema), createUserController);

router.post('/update', validateRequest(updateUserSchema), updateUserController);

router.get('/currentUser', validateRequest(getUserSchema), getUserController);

export default router;