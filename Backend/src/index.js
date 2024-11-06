import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';  // Database connection instance
import './models/User.js';  // Import User model
import './models/Service.js';  // Import Service model

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // Parse JSON requests
app.use(cors());  // Enable CORS for cross-origin requests

// Import and use user routes
import userRoutes from './routes/user.js';
app.use('/api/users', userRoutes);

// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit if the database is not connected
    }
};

// Start server and sync database
const startServer = async () => {
    try {
        await testConnection();  // Test database connection

        // Sync models with the database
        await sequelize.sync({ alter: true });  // Use `alter` to match model changes without dropping tables
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

// Initialize server
startServer();
