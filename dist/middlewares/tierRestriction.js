"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tierMiddleware = void 0;
// Middleware to restrict access to paid users
const tierMiddleware = (req, // Ensure the request type is correct
res, // The response type
next // The next middleware function
) => {
    const user = req.user; // User should be of type UserPayload
    if (!user || user.tier !== 'paid') {
        return res.status(403).json({ message: 'Access restricted to paid users only.' });
    }
    next(); // Allow access if the user is paid
};
exports.tierMiddleware = tierMiddleware;
//# sourceMappingURL=tierRestriction.js.map