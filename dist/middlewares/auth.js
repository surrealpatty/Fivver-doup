"use strict";
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const JWT_SECRET = config.JWT_SECRET; // Access secret from config
const JWT_EXPIRATION = config.JWT_EXPIRATION || '1h'; // Set default expiration if not defined
// Middleware to generate a JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION, // Access expiration from config
    });
};
// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }
        req.userId = decoded.id; // Store user ID in request for future use
        next(); // Proceed to the next middleware or route handler
    });
};
//# sourceMappingURL=auth.js.map