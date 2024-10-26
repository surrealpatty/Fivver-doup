const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Ensure the path to the config is correct

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config[process.env.NODE_ENV].jwt.secret, (err, decoded) => {
        if (err) {
            // Check if the error is due to token expiration
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            // Handle other verification errors
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // Store the decoded user information in the request object for use in the next middleware
        req.user = decoded; // Assuming `decoded` contains user information
        next(); // Call the next middleware
    });
};

module.exports = authenticateToken;
