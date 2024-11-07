import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/authMiddleware.js';

// Middleware to authenticate the token
export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No authorization header provided.' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser; // Attach verified user data to req for later use
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// Middleware to authorize based on user role
export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
};

// Middleware to check for subscription level (e.g., "Paid" subscription)
export const authorizeSubscription = (requiredSubscription) => (req, res, next) => {
    if (!req.user || req.user.subscription !== requiredSubscription) {
        return res.status(403).json({ message: `Access denied: ${requiredSubscription} subscription required.` });
    }
    next();
};
