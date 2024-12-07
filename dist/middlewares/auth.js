"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const JWT_SECRET = config_1.default.JWT_SECRET;
const JWT_EXPIRATION = config_1.default.JWT_EXPIRATION || '1h';
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Unauthorized', error: err.message });
        }
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            req.userId = String(decodedToken.id);
            return next();
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
exports.verifyToken = verifyToken;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};
exports.generateToken = generateToken;
const authenticateJWT = (req, res, next) => {
    if (!req.userId) {
        return res.status(403).json({ message: 'No valid token or userId found.' });
    }
    next();
};
exports.authenticateJWT = authenticateJWT;
