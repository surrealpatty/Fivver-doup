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
        await database_1.sequelize.close();
    });
    it('should create a new service', async () => {
        const serviceData = {
            id: (0, uuid_1.v4)(), // Generate a valid UUID string for the service id
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Ensure user.id is a valid UUID string
        };
        const service = await services_1.Service.create(serviceData);
        console.log('Created service ID:', service.id); // Log the generated ID
        // Assertions to validate the creation of the service
        expect(service.id).toBeDefined(); // Ensure service has an id assigned
        expect(service.userId).toBe(user.id); // Ensure the userId is correct
        expect(service.title).toBe('Test Service'); // Ensure the title is correct
        expect(service.price).toBe(10); // Ensure the price is correct
        expect(service.description).toBe('A test service'); // Ensure the description is correct
    });
});
