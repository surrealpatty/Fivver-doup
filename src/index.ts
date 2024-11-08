import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';  // Adjusted to named import
import userRoutes from './routes/user.js'; // Import user routes

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Routes
app.use('/api/users', userRoutes); // Use user routes for '/api/users'

// Function to test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

// Function to start the server and sync the database
const startServer = async () => {
    try {
        // Test DB connection
        await testConnection();

        // Sync models with the database
        // Use `alter: true` in development or `force: true` in testing
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit if server setup fails
    }
};

// Initialize the server
startServer();

// Export the app for testing purposes
export default app;  // Ensure the app is exported for test usage
