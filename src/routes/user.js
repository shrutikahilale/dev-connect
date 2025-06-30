import express from 'express';
import { createUserController } from '../controllers/user.controller.js';

const router = express.Router();

// Route to create a new user
router.post('/create', createUserController);

export default router;