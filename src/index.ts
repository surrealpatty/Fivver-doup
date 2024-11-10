import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';  // Correctly import sequelize instance
import userRoutes from './routes/user';  // Correct TypeScript import (omit .js)

dotenv.config();  // Load environment variables from .env file

// Create Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// Routes
app.use('/api/users', userRoutes);  // Use user routes for '/api/users'

// Function to test the database connection
const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();  // Test the database connection
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit the process if connection fails
    }
};

// Function to start the server and sync the database
const startServer = async (): Promise<void> => {
    try {
        // Test DB connection
        await testConnection();

        // Sync models with the database based on environment
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : { force: false };  // Alter models in development

        // Syncing the models to the database, handling migrations properly
        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;  // Use PORT from environment or default to 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        // Optionally add more granular error handling based on your needs
    }
};

// Initialize the server
startServer();

// Export the app for testing purposes
export default app;  // Export using TypeScript's ES6 export
