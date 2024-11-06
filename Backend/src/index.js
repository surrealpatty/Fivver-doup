import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import User from './models/User.js';
import Service from './models/Service.js';  // Import Service model directly

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import userRoutes from './routes/user.js';
app.use('/api/users', userRoutes);

// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

// Start server and sync database
const startServer = async () => {
    try {
        await testConnection();

        // Sync models with the database
        await sequelize.sync({ alter: true });  // Sync with model changes
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
