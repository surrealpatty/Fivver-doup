"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // Send the 401 response and exit early without returning anything from the middleware
        res.status(401).send('Access Denied');
        return; // Prevent further code execution
    }
    try {
        // Verify token and decode it
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Set user to the decoded JWT payload
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Invalid token response without returning a value
        res.status(400).send('Invalid Token');
        return; // Prevent further code execution
    }
};
exports.default = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map