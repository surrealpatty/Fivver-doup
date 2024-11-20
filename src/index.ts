import express, { Request, Response, NextFunction } from 'express'; // Correct TypeScript import
import bodyParser from 'body-parser';
import userRoutes from './routes/user'; // Correct import for user routes
import { authenticateToken } from './middlewares/authMiddleware'; // Correct named import for authentication middleware

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json()); // Parses incoming JSON payloads for API requests

// Public routes (no authentication required)
app.use('/users', userRoutes); // Routes for user-related actions like register, login, etc.

// Protected routes (require authentication)
app.use('/profile', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: 'Profile page (authentication required)' });
});

// Example of a specific protected route for fetching user profile
app.use('/users/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Your logic to fetch and return the user profile data
    res.json({ message: 'User profile data' });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 404 route for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler for unhandled errors in the application
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app and server for testing purposes
export { app, server };
