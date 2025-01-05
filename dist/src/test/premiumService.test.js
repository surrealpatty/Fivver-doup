"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Correct import path to your app
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database"); // Make sure this is the correct path to your sequelize instance
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
// Mock the `jsonwebtoken` module within the test scope
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockImplementation((user, secret) => {
        return `mocked-token-${user.id}`; // Mocked token generation
    }),
    verify: jest.fn().mockImplementation((token, secret) => {
        // Mock behavior based on the token (this is a simplified version for your case)
        if (token === 'mocked-token-1') {
            return { id: '1', username: 'paiduser', tier: 'paid' };
        }
        if (token === 'mocked-token-2') {
            return { id: '2', username: 'freeuser', tier: 'free' };
        }
        throw new Error('Invalid token');
    }),
}));
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
// Setup and teardown hooks for database connection
beforeAll(async () => {
    // Connect to the database before running the tests
    await database_1.sequelize.authenticate();
});
afterAll(async () => {
    // Close the database connection after tests
    await database_1.sequelize.close();
});
describe('GET /premium-service', () => {
    it('should allow access to paid users', async () => {
        const token = generateToken(mockPaidUser, 'your-secret-key');
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/premium-service')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny access to non-paid users', async () => {
        const token = generateToken(mockFreeUser, 'your-secret-key');
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/premium-service')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
    it('should return 401 if no token is provided', async () => {
        const response = await (0, supertest_1.default)(index_1.app).get('/premium-service');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized. Please log in.');
    });
});
