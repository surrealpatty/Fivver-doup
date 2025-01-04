"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Add this line at the very top to ensure Sequelize decorators work
const supertest_1 = __importDefault(require("supertest"));
const services_1 = require("../models/services"); // Corrected relative import
const index_1 = __importDefault(require("../index")); // Adjusting to the source directory directly
// Mocking the Service model methods
jest.mock('../models/services', () => ({
    Service: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
describe('Service Tests', () => {
    // Apply retry logic to all tests in this suite
    beforeEach(() => {
        jest.retryTimes(3); // Retries failed tests 3 times before reporting an error
    });
    describe('POST /api/services/create', () => {
        it('should create a service successfully', async () => {
            // Mock resolved value for Service.create
            services_1.Service.create.mockResolvedValueOnce({
                id: '1',
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
            // Send a POST request to create service endpoint
            const response = await (0, supertest_1.default)(index_1.default).post('/api/services/create').send({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
            // Verify the response
            expect(response.status).toBe(201); // Expecting a 201 Created status
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Test Service');
            // Verify that Service.create was called with the correct parameters
            expect(services_1.Service.create).toHaveBeenCalledWith({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
        });
        it('should return an error if service creation fails', async () => {
            // Mock rejected value for Service.create
            services_1.Service.create.mockRejectedValueOnce(new Error('Service creation failed'));
            const response = await (0, supertest_1.default)(index_1.default).post('/api/services/create').send({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
            expect(response.status).toBe(400); // Correcting the expected status
            expect(response.body).toHaveProperty('error', 'Service creation failed');
        });
    });
});
