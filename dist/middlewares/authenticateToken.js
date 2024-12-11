"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // Return response but do not return anything from the middleware.
        return res.status(401).send('Access Denied');
    }
    try {
        // Verify token and decode it
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Set user to the decoded JWT payload
        // Call next middleware or route handler
        return next();
    }
    catch (error) {
        // Invalid token response without returning a value
        return res.status(400).send('Invalid Token');
    }
};
exports.default = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map