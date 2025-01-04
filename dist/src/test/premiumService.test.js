"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For generating mock JWT tokens
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Adjust path if necessary

// Mock JWT token generation for paid and free users
const generateToken = (user, secretKey) => {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: '1h' });
};

// Mock user data
const mockPaidUser = {
    id: '1',
    email: 'paiduser@example.com',
    username: 'paiduser',
    tier: 'paid',
};
const mockFreeUser = {
    id: '2',
    email: 'freeuser@example.com',
    username: 'freeuser',
    tier: 'free',
};

// Mock the `authenticateToken` middleware to inject user data
jest.mock('../middlewares/authenticateToken', () => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const user = jsonwebtoken_1.default.verify(token, 'your-secret-key');
                req.user = user; // Attach the user to the request
            }
            catch (error) {
                req.user = undefined;
            }
        }
        next();
    };
});

// At the top of your test file, mock the 'jsonwebtoken' module
jest.mock('jsonwebtoken', () => ({
    // Mocking the 'verify' function to return a sample user
    verify: jest.fn().mockReturnValue({ id: 'user-id' }) // Adjust this mock return value to suit your test
}));

describe('GET /premium-service', () => {
    it('should allow access to paid users', async () => {
        const { verify } = require('jsonwebtoken'); // This will refer to the mock 'verify' function
        const token = generateToken(mockPaidUser, 'your-secret-key'); // Using real token generation for paid user
        verify(token, 'your-secret-key'); // Mocked verify call

        const response = await supertest_1.default(index_1.default)
            .get('/premium-service')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });

    it('should deny access to non-paid users', async () => {
        const { verify } = require('jsonwebtoken'); // Use mock 'verify'
        const token = generateToken(mockFreeUser, 'your-secret-key'); // Using real token generation for free user
        verify(token, 'your-secret-key'); // Mocked verify call

        const response = await supertest_1.default(index_1.default)
            .get('/premium-service')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });

    it('should return 401 if no token is provided', async () => {
        const response = await supertest_1.default(index_1.default).get('/premium-service');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized. Please log in.');
    });
});
