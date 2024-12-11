"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUserToken = void 0;
// src/test/testHelpers.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Helper function to create a mock JWT token
const createMockUserToken = (userId) => {
    const payload = {
        id: userId,
        email: 'user@example.com', // Mock email, adjust as needed
        username: 'username', // Mock username, adjust as needed
    };
    const secretKey = 'your-secret-key'; // Use your secret key, replace with actual one for testing
    // Create the token with the payload and secret key
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};
exports.createMockUserToken = createMockUserToken;
//# sourceMappingURL=testHelpers.js.map