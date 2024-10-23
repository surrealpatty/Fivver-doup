const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('./config/database'); // Ensure this path is correct
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.JWT_SECRET || 'defaultSecret', // Add a default secret for development
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true in production if using HTTPS
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/users', userRoutes);
app.use('/', authRoutes); // For registration and login

// Database synchronization
const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Error synchronizing database:', err);
    }
};

// Start the server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Initialize the app
const init = async () => {
    await syncDatabase(); // Sync the database before starting the server
    startServer();
};

init(); // Call the init function to start everything
