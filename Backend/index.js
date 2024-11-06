// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';

// Import route files
import userRouter from './src/routes/user.js';
import serviceRoutes from './src/routes/servicesRoute.js';
import reviewRoutes from './src/routes/reviews.js';

// Import model initializers
import { init as initService } from './src/models/services.js'; // Ensure this file exists and is correctly named
import { init as initUser } from './src/models/user.js'; // Ensure this file exists and is correctly named
import { init as initUserProfile } from './src/models/UserProfile.js'; // Ensure this file exists and is correctly named

// Load environment variables
dotenv.config();

// Check for required environment variables
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT', 'JWT_SECRET', 'PORT'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`FATAL ERROR: ${varName} is not defined.`);
        process.exit(1);
    }
});

// Database configuration
const dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
};

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());

// Token authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Store user info in the request
        next();
    });
};

// Apply routes
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

// Initialize models and set up associations
const initModels = () => {
    const User = initUser(sequelize); // Initialize User
    const Service = initService(sequelize); // Initialize Service
    const UserProfile = initUserProfile(sequelize); // Initialize UserProfile

    // Set up associations if defined
    if (User.associate) User.associate({ Service, UserProfile });
    if (Service.associate) Service.associate({ User });
    if (UserProfile.associate) UserProfile.associate({ User });
};

// Test and synchronize the database connection
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        initModels(); // Initialize models and their associations
        await sequelize.sync({ alter: true }); // Sync database
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1);
    }
};

// Initialize the database
initializeDatabase();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Include localhost for clarity
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
