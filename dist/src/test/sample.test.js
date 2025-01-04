"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Correct import
const uuid_1 = require("uuid"); // UUID generator
const user_1 = __importDefault(require("../models/user")); // Ensure the path is correct
const services_1 = __importDefault(require("../models/services")); // Ensure the path is correct
describe('Service Model Tests', () => {
    let user; // Declare a user variable to be used across tests
    beforeAll(async () => {
        // Ensure the database is ready before running tests
        await database_1.sequelize.sync({ force: true });
        // Create a test user before running the tests
        user = await user_1.default.create({
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
        // Define service data
        const serviceData = {
            id: (0, uuid_1.v4)(), // Generate a unique ID
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Associate the service with the created user
        };
        // Create the service and save it in the database
        const service = await services_1.default.create(serviceData);
        // Validate the created service's attributes
        expect(service.userId).toBe(user.id); // Ensure the userId matches
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
