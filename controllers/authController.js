// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User Registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        
        // Redirect to login after successful registration
        res.status(201).redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Internal server error');
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        // Check if user exists and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Set the JWT in a cookie
            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Set secure flag in production
            res.redirect('/profile');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
};

// You may want to include a logout function
exports.logoutUser = (req, res) => {
    res.clearCookie('jwt'); // Clear the JWT cookie on logout
    res.redirect('/login'); // Redirect to the login page
};
