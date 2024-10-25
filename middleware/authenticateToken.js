const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Adjust path if needed

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config[process.env.NODE_ENV].jwt.secret, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Assuming `decoded` contains user information
        next();
    });
};

module.exports = authenticateToken;
