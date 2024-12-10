"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'your-secret-key'; // Replace with your actual secret key
// Middleware to authenticate JWT token
const authenticateJWT = async (req, // Use AuthRequest type here
res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from header
        if (token) {
            jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Token is not valid' });
                }
                // Type the decoded value as UserPayload
                req.user = decoded; // Ensure it matches UserPayload structure
                next(); // Proceed to the next middleware or route handler
            });
        }
        else {
            res.status(401).json({ message: 'Unauthorized, no token provided' });
        }
    }
    catch (error) {
        next(error); // Pass any error to the next error handler
    }
};
exports.authenticateJWT = authenticateJWT;
