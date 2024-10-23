// middleware/auth.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to generate a JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expiration,
    });
};

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // Store user ID in request for future use
        next(); // Proceed to the next middleware or route handler
    });
};
