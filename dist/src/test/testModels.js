"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Ensure correct import for User model
const database_1 = require("../config/database"); // Correct import for sequelize
const uuid_1 = require("uuid"); // Ensure uuidv4 is imported
const services_1 = require("../models/services"); // Correct named import for Service
describe('Service Model Tests', () => {
    let user; // Declare user at the top to use across tests
    beforeAll(async () => {
        // Sync the database (ensure it's ready before tests)
        await database_1.sequelize.sync({ force: true });
        // Create a user before tests
        user = await user_1.default.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true,
        });
    });
    afterAll(async () => {
        // Close the database connection after tests
        await database_1.sequelize.close();
    });
    it('should create a new service', async () => {
        // Define service attributes with a valid UUID
        const serviceData = {
            id: (0, uuid_1.v4)(), // Generate a valid UUID string for the service id
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Ensure user.id is a valid UUID string
        };
        // Create the service using the defined attributes
        const service = await services_1.Service.create(serviceData);
        // Logging to check if the service is created and if the ID is set correctly
        console.log('Created service ID:', service.id); // Log the generated ID
        // Assertions to validate the creation of the service
        expect(service.id).toBeDefined(); // Ensure the ID is generated
        expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
        expect(service.description).toBe('A test service');
    });
});
