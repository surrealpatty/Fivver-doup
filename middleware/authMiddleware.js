const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach verified user data to req

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
