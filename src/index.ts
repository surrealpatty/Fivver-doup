// src/index.ts

import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/user'; // Correct import for user routes
import profileRoutes from './routes/profile'; // Import profile routes
import { authenticateToken } from './middlewares/authMiddleware'; // Correct middleware import

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Public routes (no authentication required)
app.use('/users', userRoutes); // User-related actions like registration and login

// Protected routes (require authentication)
app.use(authenticateToken); // Middleware for authentication on protected routes
app.use('/profile', profileRoutes); // Profile-related actions (protected)

// 404 route for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler for unhandled errors in the application
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err.message);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app and server for testing purposes
export { app, server };

// Ensure consistent global declaration for `user` property
declare global {
  namespace Express {
    interface Request {
      user: { id: string; username: string; email: string };
    }
  }
}
