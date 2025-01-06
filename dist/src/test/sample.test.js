"use strict";
// src/test/sample.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Correct import
const uuid_1 = require("uuid"); // UUID generator
const services_1 = require("../models/services"); // Service model import
const user_1 = require("../models/user"); // User model import
describe('Service Model Tests', () => {
    let user; // Declare a user variable to be used across tests
    beforeAll(async () => {
        // Ensure the test database (fivver_doup_test) is used and ready
        await database_1.sequelize.authenticate(); // Test connection
        // Sync the database and force recreation of tables in the test database
        await database_1.sequelize.sync({ force: true });
        // Create a test user before running the tests
        user = await user_1.User.create({
            id: '176019c7-46ea-4e86-aa00-caf519a26b3e', // Predefined UUID for the test
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true,
        });
    });
    afterAll(async () => {
        // Close the database connection after running tests
        await database_1.sequelize.close();
    });
    it('should create a new service', async () => {
        // Define service data with the missing 'role' field
        const serviceData = {
            id: (0, uuid_1.v4)(), // Generate a unique ID
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Associate the service with the created user
            role: 'user' // Add the role field here
        };
        // Create the service and save it in the database
        const service = await services_1.Service.create(serviceData);
        // Validate the created service's attributes
        expect(service.id).toBeDefined(); // Ensure the service has an ID
        expect(service.userId).toBe(user.id); // Ensure the userId matches
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
        expect(service.role).toBe('user'); // Ensure the role is correctly set
    });
});
