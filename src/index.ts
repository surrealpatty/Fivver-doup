import express from 'express';  // Correct import for express
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user'; // Ensure this path is correct
import serviceRoutes from './routes/service'; // Ensure this path is correct
import authRoutes from './routes/auth'; // Ensure this path is correct
import passwordResetRoutes from './routes/passwordReset'; // Import password reset routes

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies (Built-in middleware in Express 4.16.0+)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes setup
app.use('/api/users', userRoutes); // User routes
app.use('/api/services', serviceRoutes); // Service routes
app.use('/auth', authRoutes); // Auth routes
app.use('/api/password-reset', passwordResetRoutes); // Password reset routes

// Default route for testing the API
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Set up server listening logic
const PORT = process.env.PORT || 3000;

let server: any;

// Create and start the server, but only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  console.log('Running in test mode.');
}

// Export the server for global teardown (for testing purposes)
export { server };

// Export app as default for easier testing
export default app;
