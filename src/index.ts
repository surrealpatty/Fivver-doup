// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authenticateToken from './middleware/authMiddleware';

const app = express();

app.use(bodyParser.json());

// Public routes (no authentication needed)
app.use('/users', userRoutes);  // This makes /users/register and /users/profile available

// Private routes (authentication required)
app.use('/profile', authenticateToken, userRoutes);  // Protect /profile with token authentication

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Export app for testing purposes
export { app };
