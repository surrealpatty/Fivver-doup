// index.cjs
const express = require('express');  // Use CommonJS require for express
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./config/database');  // Correct require for sequelize
const userRoutes = require('./routes/user');  // Correct require for user routes

dotenv.config();

// Ensure required environment variables are present
if (!process.env.NODE_ENV || !process.env.PORT || !process.env.JWT_SECRET) {
    console.error('Required environment variables are missing.');
    process.exit(1);  // Exit if environment variables are missing
}

const app = express();  // Initialize Express app

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup
app.use('/api/users', userRoutes);

// Start server
const startServer = async () => {
    try {
        await testConnection();  // Test DB connection
        const syncOptions = process.env.NODE_ENV === 'development' ? { alter: true } : {};  // Alter models in development
        await sequelize.sync(syncOptions);  // Sync database models
        console.log('Database synced successfully.');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);  // Exit if error occurs
    }
};

startServer();

// Export app for testing purposes (CommonJS)
module.exports = { app };
