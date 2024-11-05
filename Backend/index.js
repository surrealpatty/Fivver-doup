// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';

// Import route files
import userRoutes from './src/routes/userRoutes.js';
import serviceRoutes from './src/routes/servicesRoute.js';
import reviewRoutes from './src/routes/review.js';

// Import model initializers and models
import { initService, Service } from './src/models/services.js';
import { initUser, User } from './src/models/user.js';
import { init as initUserProfile, UserProfile } from './src/models/UserProfile.js';

// Load environment variables
dotenv.config();

// Database configuration using environment variables
const dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
};

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Check for required environment variables
if (!JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Token authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

// Initialize models and set up associations
const initModels = () => {
    initUser(sequelize);
    initService(sequelize);
    initUserProfile(sequelize);

    if (User.associate) User.associate({ Service, UserProfile });
    if (Service.associate) Service.associate({ User });
    if (UserProfile.associate) UserProfile.associate({ User });
};

// Test and synchronize the database connection
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        initModels();
        await sequelize.sync({ alter: true });
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
    console.log(`Server is running on port ${PORT}`);
});
