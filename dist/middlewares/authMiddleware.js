"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
// Middleware to authenticate the token (JWT)
const authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            // Return immediately after sending a response
            return res.status(401).json({ message: 'No token provided' });
        }
        // Simulate token decoding here (this should be your actual logic)
        const decodedUser = {
            id: '123',
            email: 'user@example.com',
            username: 'exampleUser',
            tier: 'paid' // This should come from your JWT or database
        };
        // Create the payload object with decoded user data
        const payload = {
            id: decodedUser.id,
            email: decodedUser.email,
            username: decodedUser.username,
            tier: decodedUser.tier,
        };
        req.user = payload; // Attach the user object to req.user
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        // Return immediately after sending a response if an error occurs
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.authenticateToken = authenticateToken;
// Middleware to check if the user is authenticated (i.e., req.user exists)
const checkAuth = (req, res, next) => {
    if (!req.user) {
        // Return immediately after sending a response if user is not authenticated
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next(); // Proceed to the next middleware or route handler
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map