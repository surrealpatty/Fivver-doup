"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/test/testModels.ts
const services_1 = __importDefault(require("../models/services")); // Import the interface and class
const user_1 = require("../models/user"); // Correct named import for User
const database_1 = require("../config/database"); // Import the sequelize instance
describe('Service Model Tests', () => {
    beforeAll(async () => {
        // Sync the database (ensure it's ready before tests)
        await database_1.sequelize.sync({ force: true });
    });
    it('should create a new service', async () => {
        // Create a user with all required fields (password, role, and isVerified)
        const user = await user_1.User.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            role: 'free', // Ensure role is provided
            tier: 'free', // Add tier
            isVerified: true, // Add isVerified (to satisfy the required field)
        });
        // Prepare the service data with the correct type
        const serviceData = {
            name: 'Test Service', // Corrected to 'name' instead of 'title'
            description: 'A test service description',
            price: 100.0,
            userId: String(user.id), // Convert userId to string (to match the expected type)
        };
        // Create the service and ensure it's properly typed
        const service = await services_1.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(String(user.id)); // Ensure userId is a string
        expect(service.name).toBe('Test Service'); // Ensure 'name' is correctly used
        expect(service.price).toBe(100.0);
    });
});
//# sourceMappingURL=testModels.js.map