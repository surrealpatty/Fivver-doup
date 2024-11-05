import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'; // Import Helmet for security headers
import sequelize from './config/database.js'; // Ensure correct import with .js extension
import userRoutes from './src/routes/userRoutes.js';
import serviceRoutes from './src/routes/servicesRoute.js';
import reviewRoutes from './src/routes/review.js';
import { initService, Service } from './src/models/services.js';
import { initUser, User } from './src/models/user.js'; // Adjusted to correctly import User model
import { init as initUserProfile, UserProfile } from './src/models/UserProfile.js';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt'; // Ensure bcrypt is imported for password hashing

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Set port
const JWT_SECRET = process.env.JWT_SECRET;

// Check for required environment variables
if (!JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1); // Exit if JWT_SECRET is missing
}

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

// Middleware to authenticate token
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

// Initialize models and their associations
const initModels = () => {
    initUser(sequelize); // Initialize User model
    initService(sequelize); // Initialize Service model
    initUserProfile(sequelize); // Initialize UserProfile model

    // Set up model associations
    User.associate({ Service, UserProfile }); // User can have multiple services and one profile
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
        await sequelize.sync({ alter: true }); // Use { force: true } if you need to reset tables
        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit if unable to connect
    }
};

// Input validation for user registration
const validateRegistration = [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

// User Registration Route
app.post('/api/register', validateRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10); // Ensure bcrypt is available
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Profile Route (GET)
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Fetch the user's profile details
        const userProfile = await UserProfile.findOne({ where: { userId: user.id } });
        
        res.json({
            id: user.id,
            email: user.email,
            username: user.username,
            profile: userProfile // Include user profile details in the response
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Start the application
const startApp = async () => {
    await initializeDatabase(); // Initialize the database connection and models
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startApp(); // Start the application
