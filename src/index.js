import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import User from './models/user.js';
import Service from './models/Service.js';  // Import Service model directly
import serviceRoutes from './src/routes/serviceRoute.js';  // Correct path if index.js is in the root

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// Routes
import userRoutes from './routes/user.js';
app.use('/api/users', userRoutes);

// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit if connection fails
    }
};

// Function to start the server and sync the database
const startServer = async () => {
    try {
        await testConnection();  // Test the database connection

        // Sync models with the database (using `alter: true` to automatically apply model changes)
        await sequelize.sync({ alter: true });
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
