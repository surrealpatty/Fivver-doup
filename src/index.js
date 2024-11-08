import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

// Importing routes and models
import userRoutes from './routes/user.js';  // Import user routes
import Service from './models/Service.js';  // Import service model (if needed)

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// Routes
app.use('/api/users', userRoutes);  // Use user routes for '/api/users'

// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();  // Test the database connection
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit the process if connection fails
    }
};

// Function to start the server and sync the database
const startServer = async () => {
    try {
        await testConnection();  // Test the database connection

        // Sync models with the database (use `alter: true` in development or `force: true` in testing)
        await sequelize.sync({ alter: true });  // Use `force: true` during testing to reset DB schema
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;  // Use PORT from environment variables or default to 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);  // Exit if server setup fails
    }
};

// Initialize the server
startServer();
