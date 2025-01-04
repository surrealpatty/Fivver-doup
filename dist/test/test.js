"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../dist/index"); // Ensure this path points to the correct file in dist folder
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));

let server; // Declare the server variable to be used in setup and teardown

// Helper function to generate a JWT token with a user role
const generateToken = (id, tier) => {
    return jsonwebtoken_1.default.sign({ id, tier }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });
};

// Start server before all tests
beforeAll(async () => {
    // Start your server here if it's not automatically started by the test suite
    server = index_1.app.listen(3000); // or the appropriate port for your app
});

// Close server after all tests
afterAll(async () => {
    if (server) {
        await server.close();
    }
});

describe('Premium Service Access', () => {
    const paidToken = generateToken('1', 'paid'); // Token for a paid user
    const freeToken = generateToken('2', 'free'); // Token for a free user
    it('should allow paid users to access premium services', async () => {
        const response = await (0, supertest_1.default)(index_1.app) // Using app imported from dist/index.js
            .get('/users/premium-service') // Ensure this route matches your actual implementation
            .set('Authorization', `Bearer ${paidToken}`); // Attach the paid user's token
        // Assertions for successful access
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny free users access to premium services', async () => {
        const response = await (0, supertest_1.default)(index_1.app) // Using app imported from dist/index.js
            .get('/users/premium-service') // Ensure this route matches your actual implementation
            .set('Authorization', `Bearer ${freeToken}`); // Attach the free user's token
        // Assertions for access denial
        expect(response.status).toBe(403); // Forbidden status
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});

describe('Basic Test Suite', () => {
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Simple test to verify the test file runs
    });
    it('should respond with a message from the root endpoint', async () => {
        const response = await (0, supertest_1.default)(index_1.app).get('/'); // Root endpoint
        expect(response.status).toBe(200); // Expect a status code of 200
        expect(response.text).toBe('Fiverr backend is running'); // Match the root endpoint response
    });
});
