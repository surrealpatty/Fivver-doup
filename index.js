const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const sequelize = require('./config/database'); // Ensure this path is correct
const authRoutes = require('./routes/auth'); // Adjust based on your folder structure
const profileRoutes = require('./routes/profile'); // Adjust based on your folder structure
const usersRouter = require('./routes/users'); // Ensure this is included
require('dotenv').config();

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session setup (optional)
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// Static files and view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use the routes
app.use('/api/users', usersRouter); // User routes
app.use('/api', profileRoutes); // Profile routes
app.use('/', authRoutes); // Auth routes

// Synchronize database and start server
const startServer = async () => {
    try {
        await sequelize.sync(); // Ensure the database is synced before starting the server
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error synchronizing database:', err);
    }
};

startServer(); // Start the server
