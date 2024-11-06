import express from 'express';
import { sequelize, models } from './models';  // Ensure correct path to models
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS if needed

// Routes (example)
import userRoutes from './routes/user.js';  // Assuming you have user-related routes
app.use('/api/users', userRoutes);

// Sync DB and start the server
const startServer = async () => {
    try {
        // Sync models with the database
        await sequelize.sync();
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

startServer();
