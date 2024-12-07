"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jwt and JwtPayload
const secretKey = 'your-secret-key'; // Replace with your actual secret key
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Get token from header
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
});
exports.authenticateJWT = authenticateJWT;
