import express, { json } from 'express';
import { errorHandler } from './src/middleware/errorHandler.js';
import { connectDB } from './src/db/mongoconnect.js';
import userRoutes from './src/routes/user.route.js';
import projectRoutes from './src/routes/project.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// Middleware to parse JSON
app.use(json());

// routes
app.use('/user', userRoutes);
app.use('/project', projectRoutes);

app.use(errorHandler); // Apply the error handler

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});