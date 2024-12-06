"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/test/userServiceTest.ts
const services_1 = __importDefault(require("../models/services")); // Import the interface and class
const user_1 = require("../models/user"); // Correct named import for User
const database_1 = require("../config/database"); // Import the sequelize instance
describe('Service Model Tests', () => {
    beforeAll(async () => {
        // Sync the database (ensure it's ready before tests)
        await database_1.sequelize.sync({ force: true });
    });
    it('should create a new service', async () => {
        // Create a user with all required fields (password and role)
        const user = await user_1.User.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'testPassword123',
            role: 'free', // Ensure role is provided
        });
        // Prepare the service data with the correct type
        const serviceData = {
            userId: user.id,
            title: 'Test Service',
            description: 'A test service description',
            price: 100.0,
        };
        // Create the service and ensure it's properly typed
        const service = await services_1.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(user.id);
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(100.0);
    });
});
//# sourceMappingURL=userServiceTest.js.map