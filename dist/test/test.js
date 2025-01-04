"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index"); // Ensure this is the correct path to your app entry point
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));

// Helper function to generate a JWT token with a user role
const generateToken = (id, tier) => {
    return jsonwebtoken_1.default.sign(
        { id, tier },
        process.env.JWT_SECRET_KEY || 'your-secret-key', // Use the environment variable or a fallback
        { expiresIn: '1h' }
    );
};

describe('Premium Service Access', () => {
    const paidToken = generateToken('1', 'paid'); // Token for a paid user
    const freeToken = generateToken('2', 'free'); // Token for a free user

    it('should allow paid users to access premium services', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/users/premium-service') // Adjust route as needed
            .set('Authorization', `Bearer ${paidToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });

    it('should deny free users access to premium services', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/users/premium-service') // Adjust route as needed
            .set('Authorization', `Bearer ${freeToken}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});

describe('Basic Test Suite', () => {
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true);
    });

    it('should respond with a message from the root endpoint', async () => {
        const response = await (0, supertest_1.default)(index_1.app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    });
});
