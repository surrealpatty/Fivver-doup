const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database'); // Ensure you are importing the sequelize instance correctly
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/servicesRoute');
const reviewRoutes = require('./routes/review');
const { init: initUser, Model: User } = require('./models/user'); // Import User model and initUser function
const { init: initService, Model: Service } = require('./models/services'); // Import Service model and initService function
const { init: initUserProfile, Model: UserProfile } = require('./models/userProfile'); // Import UserProfile model and initUserProfile function

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Set up routes with prefixes
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

// Initialize models and their associations
const initModels = () => {
    initUser(sequelize); // Initialize User model
    initService(sequelize); // Initialize Service model
    initUserProfile(sequelize); // Initialize UserProfile model

    // Set up model associations
    User.associate({ Service, UserProfile });
    Service.associate({ User });
    UserProfile.associate({ User });
};

// Test and synchronize the database connection
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        initModels(); // Call to initialize models and associations

        // Sync models with the database
        await sequelize.sync(); // Use { force: true } if you need to reset tables
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit if unable to connect
    }
};

// Start the database and server
initializeDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Catch-all route for handling 404 errors
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

// Export the app instance for testing purposes
module.exports = app;
