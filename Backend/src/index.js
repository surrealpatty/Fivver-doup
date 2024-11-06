import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import './models/User.js';  // Ensure models are imported
import './models/Service.js';  // Ensure models are imported

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS if needed

// Routes
import userRoutes from './routes/user.js';  // User-related routes
app.use('/api/users', userRoutes);

// Function to test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit if the database is not connected
    }
};

// Sync DB and start the server
const startServer = async () => {
    try {
        await testConnection();  // Test the database connection

        // Sync models with the database
        await sequelize.sync();
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

startServer();
