"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/test/testModels.ts
const services_1 = __importDefault(require("../models/services")); // Import Service and ServiceAttributes
const user_1 = require("../models/user"); // Correct named import for User
const database_1 = require("../config/database"); // Import the sequelize instance
const uuid_1 = require("uuid");
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
            role: 'free',
            tier: 'free',
            isVerified: true,
            id: (0, uuid_1.v4)(), // Generate a unique ID (assuming you're using uuid)
        });
        // Prepare the service data, using Optional to allow 'id' to be omitted
        const serviceData = {
            name: 'Test Service',
            description: 'A test service description',
            price: 100.0,
            userId: user.id, // user.id is a string (UUID)
        };
        // Create the service and ensure it's properly typed
        const service = await services_1.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(user.id); // Ensure userId is a string
        expect(service.name).toBe('Test Service'); // Ensure 'name' is correctly used
        expect(service.price).toBe(100.0);
    });
});
//# sourceMappingURL=testModels.js.map