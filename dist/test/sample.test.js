"use strict";
// src/test/sample.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Correct import
const uuid_1 = require("uuid"); // UUID generator
const services_1 = require("../models/services"); // Service model import
const user_1 = __importDefault(require("../models/user")); // User model import
const UserRoles_1 = require("../types/UserRoles"); // Import enums for role and tier
describe('Service Model Tests', () => {
    let user; // Declare a user variable to be used across tests
    beforeAll(async () => {
        // Ensure the test database (fivver_doup_test) is used and ready
        await database_1.sequelize.authenticate(); // Test connection
        // Sync the database and force recreation of tables in the test database
        await database_1.sequelize.sync({ force: true });
        // Create a test user before running the tests
        user = await user_1.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: UserRoles_1.UserRole.User, // Use the enum for role
            tier: UserRoles_1.UserTier.Free, // Use the enum for tier
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
            userId: user.id.toString(), // Ensure userId is a string (UUID format)
            role: UserRoles_1.UserRole.User, // Use the enum for role
        };
        // Create the service and save it in the database
        const service = await services_1.Service.create(serviceData);
        // Validate the created service's attributes
        expect(service.id).toBeDefined(); // Ensure the service has an ID
        expect(service.userId).toBe(user.id.toString()); // Ensure the userId matches (as string)
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
        expect(service.role).toBe(UserRoles_1.UserRole.User); // Ensure the role is correctly set
    });
});
