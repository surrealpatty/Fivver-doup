"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
// Middleware to authenticate the token (you can implement your JWT logic here)
const authenticateToken = (req, res, next) => {
    try {
        // Token verification logic (this is a placeholder, use your JWT logic here)
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            // Return immediately after sending a response
            return res.status(401).json({ message: 'No token provided' });
        }
        // Here you would verify the token and extract user data
        // For the sake of the example, we simulate a decoded user object
        const decodedUser = {
            id: '123',
            email: 'user@example.com',
            username: 'exampleUser',
            tier: 'paid' // This should come from your JWT or database
        };
        // Assign decoded user data to req.user
        const payload = {
            id: decodedUser.id,
            email: decodedUser.email,
            username: decodedUser.username,
            tier: decodedUser.tier, // Ensure tier is included
        };
        req.user = payload; // Attach the user to the request object
        next(); // Proceed to the next middleware/route handler
    }
    catch (error) {
        // Return immediately after sending a response
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.authenticateToken = authenticateToken;
// Middleware to check if the user is authenticated (i.e., req.user exists)
const checkAuth = (req, res, next) => {
    if (!req.user) {
        // Return immediately after sending a response
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next(); // Proceed to the next middleware/route handler
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map