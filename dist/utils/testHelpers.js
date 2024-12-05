"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Import your Express app
const user_1 = require("models/user"); // Import User model if needed for DB interactions
const service_1 = __importDefault(require("models/service")); // Import Service model for DB interactions
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for generating the token
describe('Service Routes', () => {
    let mockUserToken;
    let userId;
    // Setup before all tests to create a mock user and generate JWT token
    beforeAll(async () => {
        // Create a mock user in the database (if needed)
        const user = await user_1.User.create({ email: 'testuser@example.com', username: 'testuser', password: 'password123' });
        userId = user.id; // Store the user ID for later tests
        // Generate a valid JWT token for that user
        mockUserToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, // Payload
        'your_secret_key', // Secret key (should be stored securely, not hardcoded)
        { expiresIn: '1h' } // Token expiration
        );
    });
    afterAll(async () => {
        // Clean up the mock user and any associated services after all tests
        await service_1.default.destroy({ where: { userId } }); // Delete any services created for the user
        await user_1.User.destroy({ where: { id: userId } }); // Delete the mock user
    });
    it('should create a new service', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/services')
            .set('Authorization', `Bearer ${mockUserToken}`)
            .send({ title: 'Test Service', description: 'This is a test service.', price: 100 });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Service created successfully.');
        expect(response.body.service).toHaveProperty('id');
        expect(response.body.service.title).toBe('Test Service');
    });
    // Add other test cases here...
});
//# sourceMappingURL=testHelpers.js.map