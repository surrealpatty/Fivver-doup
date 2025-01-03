"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const database_1 = require("../config/database"); // Correct import
const uuid_1 = require("uuid");
const services_1 = __importDefault(require("../models/services")); // Use default import
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
            id: (0, uuid_1.v4)(),
        });
    });
    afterAll(async () => {
        // Close the database connection after tests
        await database_1.sequelize.close();
    });
    it('should create a new service', async () => {
        const serviceData = {
            id: (0, uuid_1.v4)(), // Generate a valid UUID string
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // user.id is a string (UUID)
        };
        const service = await services_1.default.create(serviceData);
        // Ensure that the userId is correctly compared as a string
        expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
