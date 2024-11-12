import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './config/database';  // Database configuration
import userRoutes from './routes/user';  // Import user routes

// Load environment variables
dotenv.config();  // Ensure environment variables are loaded at the start

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON requests
app.use(cors());  // Enable CORS for cross-origin requests

// Routes
app.use('/api/users', userRoutes);  // Set up user-related routes

// Function to start the server
const startServer = async (): Promise<void> => {
    try {
        // Test DB connection
        await testConnection();
        console.log('Database connection successful.');

        // Sync database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {};  // Use 'alter' in development for automatic model updates
        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: unknown) {
        // Enhanced error handling
        console.error('Error starting the server:', error instanceof Error ? error.message : error);
    }
};

// Start the server
startServer();

// Export the app for testing
export { app };
