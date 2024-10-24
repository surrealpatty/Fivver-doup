const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Adjust the path to your config file

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Determine the current environment (development or production)
    const env = process.env.NODE_ENV || 'development';
    const jwtSecret = config[env].jwt.secret; // Access the correct JWT secret based on environment

    // Verify the token
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Store decoded token payload (including user info) in req.user
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
