import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './config/database';  // Correct import for sequelize and testConnection
import userRoutes from './routes/user';  // Import user routes

// Load environment variables from .env file
dotenv.config();  // Load environment variables as early as possible

// Create Express app
const app = express();

// Middleware
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());  // Middleware to enable CORS

// Routes
app.use('/api/users', userRoutes);  // Route handling for '/api/users'

// Function to start the server and sync the database
const startServer = async (): Promise<void> => {
    try {
        // Test DB connection
        await testConnection();

        // Sync models with the database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {};  // Alter models in development, use default in production

        // Avoid manually creating the database, sync ensures the database exists
        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not specified in .env
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error starting the server:', error.message);  // Handle error message properly
        } else {
            console.error('Error starting the server:', error);  // Log raw error if it's not an instance of Error
        }
    }
};

// Start the server
startServer();

// Export the app for testing purposes
export { app };  // Use named export for app to be compatible with ES6 imports in test files
