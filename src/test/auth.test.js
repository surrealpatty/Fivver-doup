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
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Ensure the correct relative path
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Correct import for jwt
const supertest_1 = __importDefault(require("supertest")); // Import supertest for simulating requests
const express_1 = __importDefault(require("express")); // Import express to create a test app
// Mock express app setup for testing the middleware
const app = (0, express_1.default)();
// Middleware for testing
app.use(authMiddleware_1.authenticateToken);
// Test route to use for triggering the middleware
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
});
describe('Authentication Middleware', () => {
    let validToken;
    let invalidToken;
    beforeEach(() => {
        // Setup a valid token and an invalid token
        validToken = jsonwebtoken_1.default.sign({ userId: 1 }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
        invalidToken = 'invalidtoken';
    });
    test('should authenticate a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/test')
            .set('Authorization', `Bearer ${validToken}`); // Set the Authorization header with the valid token
        expect(response.status).toBe(200); // Status should be 200 OK
        expect(response.body.message).toBe('Authenticated'); // Ensure the message is returned as expected
    }));
    test('should return an error for an invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/test')
            .set('Authorization', `Bearer ${invalidToken}`); // Set the Authorization header with the invalid token
        expect(response.status).toBe(403); // Status should be 403 Forbidden
        expect(response.body.message).toBe('Invalid token'); // Check for the expected error message
    }));
    test('should return an error if token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get('/test'); // No Authorization header set
        expect(response.status).toBe(401); // Status should be 401 Unauthorized
        expect(response.body.message).toBe('Token required'); // Check for the expected error message
    }));
});
