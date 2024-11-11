import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';  // Import Sequelize instance correctly
import userRoutes from './routes/user';  // Import user routes

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());  // Middleware to enable CORS

// Routes
app.use('/api/users', userRoutes);  // Route handling for '/api/users'

// Function to test the database connection
const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();  // Test the database connection
        console.log('Database connection has been established successfully.');
    } catch (error: any) {
        console.error('Unable to connect to the database:', error.message || error);
        process.exit(1);  // Exit the process if the connection fails
    }
};

// Function to start the server and sync the database
const startServer = async (): Promise<void> => {
    try {
        // Test DB connection
        await testConnection();

        // Sync models with the database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {};  // Alter models in development, use default in production

        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not specified in .env
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error('Error starting the server:', error.message || error);
    }
};

// Start the server
startServer();

// Export the app for testing purposes
export { app };  // Use named export for app to be compatible with ES6 imports in test files
