const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Adjust the path to your config if needed

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Store decoded token payload (including id) in req.user
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
