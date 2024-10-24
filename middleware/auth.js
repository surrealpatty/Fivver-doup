const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to generate a JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, { // Access secret from config
        expiresIn: config.JWT_EXPIRATION, // Access expiration from config
    });
};

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => { // Use the correct config key for secret
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // Store user ID in request for future use
        next(); // Proceed to the next middleware or route handler
    });
};
