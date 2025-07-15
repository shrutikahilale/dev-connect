import express from 'express';
import { createUserController, updateUserController, getUserController } from '../controllers/user.controller.js';
import { createAuth } from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validateInput.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { updateUserSchema, createUserSchema } from '../schemas/user.schema.js';
const router = express.Router();

// User routes
router.post('/register', authenticate, validateRequest(createUserSchema), createUserController);

router.put('/update', authenticate, validateRequest(updateUserSchema), updateUserController);

router.get('/currentUser', authenticate, getUserController);

router.post('/login', createAuth);

export default router;