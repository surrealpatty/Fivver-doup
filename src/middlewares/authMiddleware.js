const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No authorization header provided.' });
    }

    // Remove 'Bearer' prefix and get the token
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token using the JWT_SECRET from environment variables
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser; // Attach verified user data to req for later use

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
