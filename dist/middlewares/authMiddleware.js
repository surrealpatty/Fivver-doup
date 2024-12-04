"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// Middleware to authenticate the user (this is just a simple example)
const authMiddleware = (req, res, next) => {
    try {
        // Assuming `user` comes from your authentication logic (e.g., JWT token or session)
        const user = {
            id: '123',
            email: 'user@example.com',
            username: 'exampleUser',
            tier: 'paid' // This should come from your authentication source (e.g., DB, JWT)
        };
        // Construct the payload object (make sure 'tier' is included)
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            tier: user.tier, // Ensure this is set properly
        };
        // Assign the payload to req.user
        req.user = payload;
        // Move on to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map