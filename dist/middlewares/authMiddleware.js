"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
// Middleware to authenticate the token (JWT)
const authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Simulate token decoding here (replace this with your actual logic)
        const decodedUser = {
            id: '123',
            email: 'user@example.com',
            username: 'exampleUser',
            tier: 'paid' // This should come from your JWT or database
        };
        const payload = {
            id: decodedUser.id,
            email: decodedUser.email,
            username: decodedUser.username,
            tier: decodedUser.tier,
        };
        // Attach the user object to req.user
        req.user = payload;
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.authenticateToken = authenticateToken;
// Middleware to check if the user is authenticated (i.e., req.user exists)
const checkAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next(); // Proceed to the next middleware or route handler
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map