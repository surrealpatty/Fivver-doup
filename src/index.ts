import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user'; // Correct import for TypeScript
import { authenticateToken } from './middlewares/authMiddleware';  // Correct named import

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Public routes (no authentication required)
app.use('/users', userRoutes); // Example: /users/register, /users/login, etc.

// Protected routes (require authentication)
app.use('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profile page (authentication required)' });
});

// Example of a specific protected route
app.use('/users/profile', authenticateToken, async (req, res) => {
  try {
    // Your logic to fetch and return the user profile
    res.json({ message: 'User profile data' });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err.message);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export app and server for testing purposes
export { app, server };
