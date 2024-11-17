import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user'; // Should be correct for TypeScript
import authenticateToken from './middlewares/authMiddleware';  // Import authentication middleware

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Public routes (no authentication required)
app.use('/users', userRoutes);  // This makes /users/register, /users/login, and other public routes available

// Private routes (authentication required) - Add routes that need token authentication
app.use('/profile', authenticateToken, (req, res) => {
    res.send('Profile page (authentication required)');
});

// Example of a specific protected route
app.use('/users/profile', authenticateToken, async (req, res) => {
    try {
        // Your logic to fetch and return the user profile (e.g., from a database)
        res.json({ message: 'User profile data' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Export app and server for testing purposes
export { app, server };
