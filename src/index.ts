import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './config/database';
import userRoutes from './routes/user';  // Ensure correct import path
import './models/associations';  // Ensure this is imported to apply the associations

// Load environment variables from .env file
dotenv.config();

// Check that necessary environment variables are available
if (!process.env.PORT || !process.env.NODE_ENV) {
    console.error('Missing necessary environment variables.');
    process.exit(1);  // Exit if essential variables are missing
}

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON requests
app.use(cors());  // Enable CORS for cross-origin requests

// Root route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Fiverr backend is running');
});

// User-related routes
app.use('/api/users', userRoutes);

// Function to initialize the database and start the server
const startServer = async (): Promise<void> => {
    try {
        // Test DB connection
        await testConnection();
        console.log('Database connection successful.');

        // Sync database with models
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {};  // Use 'alter' in development for automatic updates
        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);  // Exit the process with a failure code
    }
};

// Start the server only if this file is executed directly (i.e., not during testing)
if (require.main === module) {
    startServer();
}

// Export the app for testing purposes
export default app;
