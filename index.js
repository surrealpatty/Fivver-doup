// index.js
const dotenv = require('dotenv');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
<<<<<<< HEAD
<<<<<<< HEAD
const sequelize = require('./config/database'); // Ensure this path is correct
const User = require('./models/user'); // User model
const UserProfile = require('./models/UserProfile'); // Ensure this model is correct

dotenv.config(); // Load environment variables
=======
=======
>>>>>>> feature-name
const User = require('./models/user'); // Ensure this path is correct
const sequelize = require('./config'); // Import Sequelize instance
>>>>>>> origin/feature-name

dotenv.config(); // Load environment variables

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your .env file

// Middleware
app.use(express.json()); // To parse JSON requests

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
<<<<<<< HEAD
<<<<<<< HEAD
        return res.status(401).json({ message: 'No token provided' });
=======
        return res.status(401).json({ message: 'No token provided' }); // If no token, unauthorized
>>>>>>> origin/feature-name
=======
        return res.status(401).json({ message: 'No token provided' }); // If no token, unauthorized
>>>>>>> feature-name
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
<<<<<<< HEAD
<<<<<<< HEAD
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
=======
=======
>>>>>>> feature-name
            return res.status(403).json({ message: 'Invalid token' }); // If token invalid, forbidden
        }
        req.user = user; // Attach user information to request
        next(); // Proceed to the next middleware or route
>>>>>>> origin/feature-name
    });
};

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
<<<<<<< HEAD
<<<<<<< HEAD
        process.exit(1);
    });

// Sync the UserProfile model with the database
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced with UserProfile model');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

=======
        process.exit(1); // Exit the application if the database connection fails
    });

>>>>>>> origin/feature-name
=======
        process.exit(1); // Exit the application if the database connection fails
    });

>>>>>>> feature-name
// Input validation middleware
const validateRegistration = [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

// User Registration Route
app.post('/api/register', validateRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Respond with user info (omit the password)
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
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
        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Profile Route (GET)
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        // Respond with user profile info
<<<<<<< HEAD
<<<<<<< HEAD
        const user = await User.findByPk(req.user.id);
=======
        const user = await User.findByPk(req.user.id); // Fetch user by ID
>>>>>>> origin/feature-name
=======
        const user = await User.findByPk(req.user.id); // Fetch user by ID
>>>>>>> feature-name
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
<<<<<<< HEAD
<<<<<<< HEAD
            id: user.id,
            email: user.email,
            username: user.username
=======
            id: user.id,       // User ID
            email: user.email, // User email
            username: user.username // User username
>>>>>>> origin/feature-name
=======
            id: user.id,       // User ID
            email: user.email, // User email
            username: user.username // User username
>>>>>>> feature-name
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
