"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import Router from express
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // JWT for verifying tokens
// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key
// Create an instance of the Router
const router = (0, express_1.Router)();
router.get('/some-route', (req, res, next) => {
    const authHeader = req.get('authorization'); // Get the authorization header
    // Check if authorization header is a string
    if (typeof authHeader === 'string') {
        const token = authHeader.split(' ')[1]; // Now safe to call split on a string
        // If there's no token, send an error
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        try {
            // Verify the token
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            // Handle the case where email is optional and may be undefined
            if (decoded.email === undefined) {
                console.warn('User payload is missing email');
            }
            // Attach the decoded user information to the request object
            req.user = decoded;
            // Continue to the next middleware or route handler
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
    else {
        // Handle case where authorization is not a string (string[] or undefined)
        return res.status(400).json({ message: 'Authorization header is not a valid string' });
    }
});
// Export the router to be used in the app
exports.default = router;
//# sourceMappingURL=api.js.map