"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Ensure the correct path to your app entry point
// Example JWT tokens (replace with actual valid tokens for testing)
const paidToken = 'your-valid-paid-user-token'; // Replace with actual paid user token
const freeToken = 'your-valid-free-user-token'; // Replace with actual free user token
describe('Role-based Access for Premium Service', () => {
    it('should allow paid users to access premium services', async () => {
        // Make a request to the /premium-service endpoint as a paid user
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/premium-service') // Ensure this matches the actual route
            .set('Authorization', `Bearer ${paidToken}`); // Attach paid user's token
        // Assert the response status and body
        expect(response.status).toBe(200); // Status should be 200 for paid users
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny free users from accessing premium services', async () => {
        // Make a request to the /premium-service endpoint as a free user
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/premium-service') // Ensure this matches the actual route
            .set('Authorization', `Bearer ${freeToken}`); // Attach free user's token
        // Assert the response status and body
        expect(response.status).toBe(403); // Status should be 403 for free users
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
