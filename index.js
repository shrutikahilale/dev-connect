import express, { json } from 'express';
import { errorHandler } from './src/middleware/errorHandler.js';
import { connectDB } from './src/db/mongoconnect.js';
import routes from './src/routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// Middleware to parse JSON
app.use(json());

// use routes
app.use('/user', routes);

// // Not found handler
// app.use('*', (req, res) =>
//     res.status(404).json({ error: { message: 'Not found' }, is_success: false })
// );

// app.use(errorHandler); // Apply the error handler

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});