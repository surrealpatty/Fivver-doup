"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("src/index")); // Ensure the correct path to your app
// Mock authenticated user data
const mockUser = {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    tier: 'paid', // Mock the tier property here
};
describe('GET /premium-service', () => {
    it('should allow access to paid users', async () => {
        const response = await (0, supertest_1.default)(index_1.default)
            .get('/premium-service')
            .set('Authorization', `Bearer valid-token`) // Provide valid JWT token
            .use((req) => {
            // Mock req.user inside the test middleware
            req.user = mockUser;
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny access to non-paid users', async () => {
        const nonPaidUser = {
            id: '2',
            email: 'nonpaid@example.com',
            username: 'nonpaiduser',
            tier: 'free', // Mock the tier as free
        };
        const response = await (0, supertest_1.default)(index_1.default)
            .get('/premium-service')
            .set('Authorization', `Bearer valid-token`) // Provide valid JWT token
            .use((req) => {
            // Mock req.user with a non-paid user inside the test middleware
            req.user = nonPaidUser;
        });
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
