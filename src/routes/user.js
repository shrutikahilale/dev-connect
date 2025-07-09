import express from 'express';
import { createUserController, updateUserController, getUserController } from '../controllers/user.controller.js';

const router = express.Router();

// User routes
router.post('/create', createUserController);
router.post('/update', updateUserController);
router.get('/currentUser', getUserController);

export default router;