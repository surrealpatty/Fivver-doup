"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Ensure the correct path to your app entry point
const services_1 = require("../models/services"); // Ensure the correct path to Service model
const database_1 = require("../config/database"); // Ensure sequelize instance is correctly imported
jest.mock('../models/services', () => ({
    Service: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
// Ensure database sync before tests
beforeAll(async () => {
    try {
        await database_1.sequelize.sync({ force: true }); // Sync the database for testing
    }
    catch (error) {
        console.error('Database sync failed:', error); // Log errors for debugging
        throw error; // Rethrow to ensure test suite halts on critical setup failures
    }
});
// Close database connection after tests
afterAll(async () => {
    await database_1.sequelize.close();
});
describe('Service Tests', () => {
    it('should create a service successfully', async () => {
        // Mock resolved value for Service.create
        services_1.Service.create.mockResolvedValueOnce({
            id: '1',
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
            userId: 'test-user-id', // Add userId for a complete mock
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const response = await (0, supertest_1.default)(index_1.app).post('/api/services/create').send({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        expect(response.status).toBe(201); // Check for successful response
        expect(response.body).toHaveProperty('id'); // Check response contains id
        expect(response.body.title).toBe('Test Service'); // Verify title
        expect(services_1.Service.create).toHaveBeenCalledWith({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        }); // Verify mock function was called with correct arguments
    });
});
