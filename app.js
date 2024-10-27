const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config'); // Your Sequelize instance
const userRoutes = require('./routes/user'); // Assuming you have separate route files

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', userRoutes); // Set up routes

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if unable to connect
    });

// Start the server
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app instance
