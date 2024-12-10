"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
// src/middlewares/authenticateJWT.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token
    if (!token) {
        res.status(403).json({ message: 'No token provided.' });
        return;
    }
    // Verify the token with the correct options
    const options = { algorithms: ['HS256'] }; // Specify the algorithm correctly
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, options, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token.' });
            return;
        }
        if (decoded) {
            req.user = {
                id: decoded.id,
                email: decoded.email,
                username: decoded.username,
                tier: decoded.tier,
                role: decoded.role,
            };
        }
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authenticateJWT.js.map